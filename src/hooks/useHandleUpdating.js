import React, { useEffect, useState } from "react";
import { checkMessagesForUpdate } from "../chat/handleChat";
import { incrementField, updateDocInFirestore } from "../misc/handleFirestore";
import { checkTimeDiff, dateToTimestamp } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";

const useHandleUpdating = () => {
  const { displayedMessages, updateDisplayedMessage } = chatStore();
  const { info } = userStore();
  const [updateStuff, setUpdateStuff] = useState();
  const { lastActive, toUpdateStuff, clearUpdateList } = miscStore();
  const [active, setActive] = useState(null);

  useEffect(() => {
    setUpdateStuff(toUpdateStuff);
  }, [toUpdateStuff]);

  useEffect(() => {
    setActive(lastActive);
  }, [lastActive]);

  useEffect(() => {
    setUpdateMessages(displayedMessages);
  }, [displayedMessages]);

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
