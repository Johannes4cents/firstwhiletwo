import React, { useEffect, useState } from "react";
import { checkMessagesForUpdate } from "../chat/handleChat";
import {
  getDocListener,
  getSingleDocFromFirestore,
  incrementField,
  updateDocInFirestore,
} from "../misc/handleFirestore";
import {
  checkTimeDiff,
  dateToTimestamp,
  forArrayLength,
} from "../misc/helperFuncs";
import { realDb } from "../firebase/fireInit";

import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";
import { onDisconnect, onValue, ref, set } from "firebase/database";

const useHandleUpdating = () => {
  const { displayedMessages, updateDisplayedMessage } = chatStore();
  const { info, loggedIn, lastUpdated, changeLastUpdated, setInfo } =
    userStore();
  const [updateMessages, setUpdateMessages] = useState([]);
  const [updateStuff, setUpdateStuff] = useState();
  const { lastActive, toUpdateStuff, clearUpdateList } = miscStore();
  const [active, setActive] = useState(null);
  const [updateSubscription, setUpdateSubscription] = useState(null);

  function updateInfo(timestamp) {
    getSingleDocFromFirestore("users", info.uid, (doc) => {
      setInfo(doc);
      changeLastUpdated("newInfo", timestamp);
    });
  }

  useEffect(() => {
    var unsubscribe = null;
    if (loggedIn) {
      unsubscribe = getDocListener("general", "updates", (updateDoc) => {
        const updateList = [{ name: "newInfo", func: updateInfo }];
        forArrayLength(updateList, (field) => {
          var localValue = lastUpdated[field.name];
          var fireValue = updateDoc[field.name];
          if (localValue != fireValue) field.func(fireValue);
        });
      });
      setUpdateSubscription(unsubscribe);
    } else {
      setUpdateSubscription((unsubscribe) => {
        if (unsubscribe) unsubscribe();
        return unsubscribe;
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loggedIn]);

  useEffect(() => {
    setUpdateStuff(toUpdateStuff);
  }, [toUpdateStuff]);

  useEffect(() => {
    setActive(lastActive);
  }, [lastActive]);

  useEffect(() => {
    setUpdateMessages(displayedMessages);
  }, [displayedMessages]);

  useEffect(() => {
    // set user as online in realtime db
    if (info != null) {
      const onlineRef = ref(realDb, ".info/connected");
      const userRef = ref(realDb, `/status/${info.uid}`);
      if (loggedIn) {
        onValue(onlineRef, (snapshot) => {
          onDisconnect(userRef)
            .set("offline")
            .then((bla) => {
              updateDocInFirestore("users/", info.uid, "online", true);
              set(userRef, "online");
            });
        });
      }
    }
  }, [loggedIn, info]);

  // update toUpdateStuff
  useEffect(() => {
    setActive((state) => {
      if (state != null) {
        let timeDiff = checkTimeDiff(state, dateToTimestamp(new Date()));
        if (timeDiff < 1) {
          // update votes
          setUpdateStuff((state) => {
            state.votes.forEach((v) => {
              incrementField(
                v.path,
                v.id,
                `ressources.${v.ressource}.upvotes`,
                v.upvotes
              );
              incrementField(
                v.path,
                v.id,
                `ressources.${v.ressource}.downvotes`,
                -v.downvotes
              );
            });
            clearUpdateList(info.uid, "votes");
            return state;
          });
        }
      }
      return state;
    });
  }, [8053]);

  // update displayedMessages
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((state) => {
        if (state != null) {
          let timeDiff = checkTimeDiff(state, dateToTimestamp(new Date()));
          if (timeDiff < 1) {
            setUpdateMessages((state) => {
              checkMessagesForUpdate(state, updateDisplayedMessage);
              return state;
            });
          }
        }
        return state;
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
};

export default useHandleUpdating;
