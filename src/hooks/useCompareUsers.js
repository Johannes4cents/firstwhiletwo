import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { clamp, forArrayLength } from "../misc/helperFuncs";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";

const useCompareUsers = () => {
  const { info, loggedIn, myAnswers } = userStore();
  const { otherUser, addUserComparissons, userComparissons } = listsStore();
  const [scanningUser, setScanningUser] = useState(false);
  const [scanningCompare, setScanningCompare] = useState(false);
  const [userIndex, setUserIndex] = useState({ start: 0, end: 10 });
  const [compareIndex, setCompareIndex] = useState({ start: 0, end: 10 });
  const [newUser, setNewUser] = useState([]);

  // Scan user
  async function checkIfNewUser(tenUser) {
    let foundUsers = [];

    forArrayLength(tenUser, (user) => {
      let foundUser = userComparissons.find((u) => u.id == user.id);
      if (
        foundUser &&
        foundUser.timestamp == user.timestamp &&
        !info.updates.statements
      ) {
      } else {
        foundUsers.push(user);
      }
    });
    setNewUser((state) => {
      return [...state, ...foundUsers];
    });

    setUserIndex((state) => {
      return {
        start: clamp(state.end, 0, otherUser.length),
        end: clamp(state.end + 10, 0, otherUser.length),
      };
    });
  }

  useEffect(() => {
    if (info && loggedIn && !scanningUser) {
      setScanningUser(true);
      let tenUser = otherUser.slice(
        userIndex.start,
        clamp(userIndex.end, 0, userIndex.length)
      );
      checkIfNewUser(tenUser);
    }
  }, [info, loggedIn, otherUser]);

  useEffect(() => {
    if (info && loggedIn && userIndex != 0) {
      if (userIndex.start != userIndex.end) {
        setTimeout(() => {
          let tenUser = otherUser.slice(
            userIndex.start,
            clamp(userIndex.end, 0, otherUser.length)
          );
          checkIfNewUser(tenUser);
        }, 200);
      } else {
        setScanningUser(false);
      }
    }
  }, [userIndex]);

  function getScore(importance) {
    let obj = { 0: 0, 1: 1, 2: 2, 3: 4 };
    return obj[importance];
  }

  // compare user
  async function compareWithUser(tenUser) {
    const checkedUsers = [];
    // itterate through all user
    forArrayLength(tenUser, (user) => {
      const comparedUser = {
        id: user.id,
        name: user.uniqueName,
        overallScore: {
          user: { score: 0, possible: 0 },
          otherUser: { score: 0, possible: 0 },
        },
        statements: [],
      };
      // itterate through all your answers
      forArrayLength(myAnswers, (answer) => {
        // check if the other user has also answered the question
        const foundStatement = user.statements.find(
          (s) => s.statement.flagId == answer.statement.flagId
        );
        // if they have answered the same
        if (foundStatement) {
          // increase possible score
          comparedUser.overallScore.user.possible += getScore(
            answer.importance
          );
          comparedUser.overallScore.otherUser.possible += getScore(
            foundStatement.importance
          );
          // increase score if both have answered the same
          const match =
            foundStatement.statement.statement == answer.statement.id;
          if (match) {
            comparedUser.overallScore.user.score += getScore(answer.importance);
            comparedUser.overallScore.otherUser.score += getScore(
              foundStatement.importance
            );
          }
          // add statement to comparedUser.statements
          const comparedStatement = {
            flagId: answer.statement.flagId,
            match,
            importance: {
              user: answer.importance,
              otherUser: foundStatement.importance,
            },
          };
          comparedUser.statements.push(comparedStatement);
        }
      });
      checkedUsers.push(comparedUser);
    });

    if (checkedUsers.length > 0) addUserComparissons(info.uid, checkedUsers);
    setCompareIndex((state) => {
      return {
        start: clamp(state.end, 0, newUser.length),
        end: clamp(state.end + 10, 0, newUser.length),
      };
    });
  }

  useEffect(() => {
    if (info && loggedIn && !scanningCompare && myAnswers.length > 0) {
      setScanningCompare(true);
      let tenUser = newUser.slice(
        userIndex.start,
        clamp(userIndex.end, 0, userIndex.length)
      );
      compareWithUser(tenUser);
    }
  }, [newUser, info, loggedIn, myAnswers]);

  useEffect(() => {
    if (info && loggedIn) {
      if (compareIndex.start != compareIndex.end && compareIndex != 0) {
        setTimeout(() => {
          let tenUser = newUser.slice(
            compareIndex.start,
            clamp(compareIndex.end, 0, newUser.length)
          );
          compareWithUser(tenUser);
        }, 200);
      } else {
        setScanningCompare(false);
      }
    }
  }, [compareIndex]);
};

export default useCompareUsers;
