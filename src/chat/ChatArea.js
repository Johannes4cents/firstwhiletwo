import React, { useEffect, useState } from "react";
import useMouseHandling from "../hooks/useMouseHandling";
import { updateTimeCheck } from "../misc/handleUpdates";
import { checkTimeDiff, dateToTimestamp } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import AttachedMediaField from "./AttachedMediaField";
import AttachedItemField from "./AttachedItemField";
import ChatMessagesField from "./ChatMessagesField";
import { checkMessagesForUpdate } from "./handleChat";
import InputField from "./InputField";
import userStore from "../stores/userStore";

const ChatArea = () => {
  const { addAttachedItem, currentMessage, addMyMediaToMsg } = chatStore();
  const { info } = userStore();

  const mouseEvents = useMouseHandling({ onDrop });

  useEffect(() => {
    console.log("currentMEssage - ", currentMessage);
  }, [currentMessage]);

  function onDrop(dragCursor) {
    if (dragCursor.type == "loot") addAttachedItem(info, dragCursor.item);
    if (dragCursor.type == "media") addMyMediaToMsg(dragCursor.item);
  }
  return (
    <div
      className="divColumn"
      style={{ height: "100%", alignItems: "end" }}
      {...mouseEvents}
    >
      <ChatMessagesField />
      {currentMessage.attachedMedia.length > 0 && <AttachedMediaField />}
      {currentMessage.attachedItems.map((i) => {
        return <AttachedItemField key={i.id} item={i} />;
      })}
      <InputField />
    </div>
  );
};

export default ChatArea;
