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
  const { attachedItem, setAttachedItem } = chatStore();

  const mouseEvents = useMouseHandling({ onDrop });

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
