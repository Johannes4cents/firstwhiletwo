import React, { useEffect, useState } from "react";
import useMouseHandling from "../hooks/useMouseHandling";
import { updateTimeCheck } from "../misc/handleUpdates";
import { checkTimeDiff, dateToTimestamp } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import AttachedItemField from "./AttachedItemField";
import ChatMessagesField from "./ChatMessagesField";
import { checkMessagesForUpdate } from "./handleChat";
import InputField from "./InputField";

const ChatArea = () => {
  const {
    attachedItem,
    setAttachedItem,
    displayedMessages,
    updateDisplayedMessage,
  } = chatStore();
  const [updateMessages, setUpdateMessages] = useState([]);
  const mouseEvents = useMouseHandling({ onDrop });
  const { lastActive } = miscStore();
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(lastActive);
  }, [lastActive]);

  useEffect(() => {
    setUpdateMessages(displayedMessages);
  }, [displayedMessages]);

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

  function onDrop(dragCursor) {
    console.log("dragCUrsor - ", dragCursor);
    if (dragCursor.type == "loot") setAttachedItem(dragCursor.item);
  }
  return (
    <div
      className="divColumn"
      style={{ height: "100%", alignItems: "end" }}
      {...mouseEvents}
    >
      <ChatMessagesField />
      {attachedItem && <AttachedItemField />}
      <InputField />
    </div>
  );
};

export default ChatArea;
