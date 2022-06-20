import React, { useState } from "react";
import useMouseHandling from "../hooks/useMouseHandling";
import chatStore from "../stores/chatStore";
import AttachedItemField from "./AttachedItemField";
import ChatMessagesField from "./ChatMessagesField";
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
