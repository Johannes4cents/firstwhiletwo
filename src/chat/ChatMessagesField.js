import React, { useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import MessageHolder from "./holder/MessageHolder";

const ChatMessagesField = () => {
  const { displayedMessages } = chatStore();
  const windowSize = useWindowSize();
  const { inputHeight } = miscStore();

  return (
    <div
      className="divColumn"
      style={{
        height: "100%",
        justifyContent: "end",
        alignItems: "end",
        width: "100%",
      }}
    >
      <div
        className="divColumn"
        style={{
          width: "100%",
          maxHeight: `${windowSize.height - inputHeight - 90}px`,
          overflow: "auto",
        }}
      >
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
