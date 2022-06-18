import React from "react";
import ChatMessagesField from "./ChatMessagesField";
import InputField from "./InputField";

const ChatArea = () => {
  return (
    <div className="divColumn" style={{ height: "100%", alignItems: "end" }}>
      <ChatMessagesField />
      <InputField />
    </div>
  );
};

export default ChatArea;
