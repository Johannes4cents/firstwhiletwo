import { toBeEmptyDOMElement } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import chatStore from "../stores/chatStore";
import miscStore from "../stores/miscStore";
import MessageHolder from "./holder/MessageHolder";

const ChatMessagesField = () => {
  const scrollDiv = useRef(null);
  const { displayedMessages } = chatStore();
  const windowSize = useWindowSize();
  const { inputHeight, attachedItemHeight } = miscStore();
  const [customPosition, setCustomPosition] = useState(false);
  const [wheel, setWheel] = useState(false);

  useEffect(() => {
    if (scrollDiv) {
      console.log("customPosition - ", customPosition);
      if (!customPosition) {
        scrollDiv.current.scrollIntoView();
        setCustomPosition(false);
      }
    }
  }, [displayedMessages]);

  function handleOnScrollCustomPosition(e) {
    const bottomReached =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottomReached) {
      console.log("bottomReached");
      setCustomPosition(false);
    } else if (!bottomReached && wheel) {
      console.log("customScroll");
      setCustomPosition(true);
    }
  }

  function handleWheel() {
    setWheel(true);
    setTimeout(() => {
      setWheel(false);
    }, 100);
  }

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
        onScroll={handleOnScrollCustomPosition}
        onWheel={handleWheel}
        style={{
          width: "100%",
          maxHeight: `${
            windowSize.height - inputHeight - attachedItemHeight - 95
          }px`,
          overflow: "auto",
        }}
      >
        {displayedMessages
          .sort((a, b) => (a.timestamp.msTime > b.timestamp.msTime ? 1 : -1))
          .map((msg) => {
            return <MessageHolder message={msg} key={msg.id} />;
          })}
        <div ref={scrollDiv} style={{ height: "0px" }} />
      </div>
    </div>
  );
};

export default ChatMessagesField;
