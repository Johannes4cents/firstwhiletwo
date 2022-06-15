import React from "react";
import ChatMessagesField from "./ChatMessagesField";
import InputField from "./InputField";

const ChatArea = () => {
  return (
    <div className="divColumn" style={{ height: "100%" }}>
      <ChatMessagesField />
      <InputField />
    </div>
  );
};

export default ChatArea;
