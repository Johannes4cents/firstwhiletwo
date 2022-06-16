import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../fire_classes/ChatMessage";
import { setDocInFirestore } from "../misc/handleFirestore";
import { getRandomId } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import userStore from "../stores/userStore";
import { sendMessageToTurfChats } from "./handleChat";

const InputField = () => {
  const heightSpan = useRef(null);
  const inputWidth = useRef(null);
  const { activeChat, activeChats } = chatStore();
  const { info } = userStore();
  const [content, setContent] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  const onEnter = (e) => {
    if (e.key == "Enter" && !e.shiftKey && content.length > 0) {
      e.preventDefault();
      submitMsg();
    }
    if (e.key == "Enter" && e.shiftKey) {
      setContent(content + "\n");
    }
  };

  const submitMsg = () => {
    const msg = ChatMessage(activeChats, content, {
      nickname: info.nickname,
      id: info.uid,
      imgUrl: info.profilePicUrl,
    });
    sendMessageToTurfChats(activeChat, msg);
    setContent("");
  };

  useEffect(() => {
    if (inputWidth != null) {
      setWidth(inputWidth.current.offsetWidth);
    }
  }, [inputWidth]);

  useEffect(() => {
    setHeight(heightSpan.current.offsetHeight);
  }, [content]);
  return (
    <div
      className="divRow"
      style={{ width: "100%", marginBottom: "5px", marginTop: "10px" }}
    >
      <span
        ref={heightSpan}
        style={{
          position: "absolute",
          opacity: 0.5,
          textAlign: "center",
          overflow: "hidden",
          width,
          color: "green",
          pointerEvents: "none",
          fontFamily: "Roboto-Regular",
          fontSize: "15px",
          minHeight: "20px",
          borderRadius: "3em/5em",
        }}
      >
        {content}
      </span>
      <textarea
        ref={inputWidth}
        onKeyDown={onEnter}
        type={"textarea"}
        className="inputField"
        style={{
          width: "100%",
          height,
          textAlign: "center",
          overflow: "hidden",
        }}
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </div>
  );
};

export default InputField;
