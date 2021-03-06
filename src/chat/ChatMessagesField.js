import { toBeEmptyDOMElement } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import DragDropDiv from "../misc/elements/DragDropDiv";
import { forArrayLength } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import MessageHolder from "./holder/MessageHolder";

const ChatMessagesField = () => {
  const scrollDiv = useRef(null);
  const { displayedMessages, attachDroppedMeddia } = chatStore();
  const windowSize = useWindowSize();
  const { inputHeight, attachedItemHeight, attachedImagesHeight } = miscStore();
  const { dragCursor } = miscStore();

  const [customPosition, setCustomPosition] = useState(false);
  const [wheel, setWheel] = useState(false);

  useEffect(() => {
    if (scrollDiv) {
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
      setCustomPosition(false);
    } else if (!bottomReached && wheel) {
      setCustomPosition(true);
    }
  }

  function handleWheel() {
    setWheel(true);
    setTimeout(() => {
      setWheel(false);
    }, 100);
  }

  function handleDrop(files) {
    const imageEndings = ["png", "jpg", "jpeg", "gif"];
    const imageFiles = [];
    forArrayLength(files, (file) => {
      if (imageEndings.some((ending) => file.name.endsWith(ending))) {
        imageFiles.push(file);
      }
    });

    if (imageFiles.length > 0) attachDroppedMeddia(imageFiles, "image");
  }

  return (
    <DragDropDiv
      handleDrop={handleDrop}
      dragCursor={dragCursor}
      className="divColumn"
      style={{
        display: "flex",
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
            windowSize.height -
            inputHeight -
            attachedImagesHeight -
            attachedItemHeight -
            95
          }px`,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {displayedMessages.map((msg, index) => {
          return (
            <MessageHolder
              message={msg}
              key={msg.id}
              lastMsg={
                (displayedMessages[index - 1] ?? { author: { id: null } })
                  .author.id
              }
            />
          );
        })}
        <div ref={scrollDiv} style={{ height: "0px" }} />
      </div>
    </DragDropDiv>
  );
};

export default ChatMessagesField;
