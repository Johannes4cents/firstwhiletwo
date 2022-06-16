import React from "react";
import chatStore from "../stores/chatStore";
import MessageHolder from "./holder/MessageHolder";

const ChatMessagesField = () => {
  const { displayedMessages } = chatStore();
  return (
    <div
      className="divColumn"
      style={{
        flex: 1,
        justifyContent: "end",
        width: "100%",
        overflow: "auto",
      }}
    >
      <div className="divColumn" style={{ width: "100%" }}>
        {displayedMessages
          .sort((a, b) => (a.timestamp.msTime > b.timestamp.msTime ? 1 : -1))
          .map((msg) => {
            return <MessageHolder message={msg} key={msg.id} />;
          })}
      </div>
    </div>
  );
};

export default ChatMessagesField;
