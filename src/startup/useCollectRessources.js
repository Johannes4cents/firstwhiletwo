import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { forArrayLength, objectToArray, testChance } from "../misc/helperFuncs";
import { ressources } from "../misc/lists/otherLists";
import chatStore from "../stores/chatStore";
import userStore from "../stores/userStore";

const useCollectRessources = () => {
  const { displayedMessages } = chatStore();
  const [resScore, setResScore] = useState({});
  const { info, changeRessources, setLastRessource, loggedIn } = userStore();

  function getResByScore(score) {
    console.log("test");
    if (info) {
      let scoreArray = objectToArray(score)
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .splice(0, 3);
      forArrayLength(scoreArray, (score) => {
        const dropChance = info.ressources[score.key].dropChance;
        const scoreChance = score.value > 20 ? 10 : score > 10 ? 5 : 2;
        let success = testChance(scoreChance, dropChance);
        if (success) {
          changeRessources(score.key, 1);
          setLastRessource(score.key);
          return;
        }
      });
    }
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setResScore((score) => {
        getResByScore(score);
        return score;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [loggedIn]);

  useEffect(() => {
    if (info) {
      let newScore = {};
      forArrayLength(ressources, (res) => {
        newScore[res] = 0;
      });
      forArrayLength(displayedMessages, (message) => {
        if (message.resScore) {
          forArrayLength(objectToArray(message.resScore), (kv) => {
            newScore[kv.key] += kv.value;
          });
        }
      });
      setResScore(newScore);
    }
  }, [displayedMessages, loggedIn]);
};

export default useCollectRessources;
