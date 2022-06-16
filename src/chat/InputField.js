import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../fire_classes/ChatMessage";
import { setDocInFirestore } from "../misc/handleFirestore";
import { getRandomId } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import userStore from "../stores/userStore";
import { sendMessageToTurfChats } from "./handleChat";
import InputOptionsBar from "./InputOptionsBar";

const InputField = () => {
  const heightSpan = useRef(null);
  const inputWidth = useRef(null);
  const [focusColor, setFocusColor] = useState("rgb(82, 82, 82)");
  const { activeChat, activeChats, selectedMsgRessources } = chatStore();
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
    const msg = ChatMessage(selectedMsgRessources, activeChats, content, {
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
      style={{
        width: "100%",
        marginBottom: "5px",
        marginTop: "10px",
        backgroundColor: focusColor,
        borderRadius: "3em/5em",
      }}
    >
      <div className="divRow" style={{ width: "100%" }}>
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
          onFocus={(e) => {
            setFocusColor("rgb(100, 100, 100)");
          }}
          onBlur={() => {
            setFocusColor("rgb(82, 82, 82)");
          }}
          ref={inputWidth}
          onKeyDown={onEnter}
          type={"textarea"}
          className="inputField"
          style={{
            flex: 1,
            height,
            textAlign: "center",
            overflow: "hidden",
            backgroundColor: focusColor,
          }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <InputOptionsBar height={height} />
    </div>
  );
};

export default InputField;
