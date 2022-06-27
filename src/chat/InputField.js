import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../fire_classes/ChatMessage";
import { setDocInFirestore } from "../misc/handleFirestore";
import { getRandomId, newTrim } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import listsStore from "../stores/listsStore";
import miscStore from "../stores/miscStore";
import userStore from "../stores/userStore";
import { checkCorrectChatDepth, sendMessageToTurfChats } from "./handleChat";
import InputOptionsBar from "./InputOptionsBar";

const InputField = () => {
  const heightSpan = useRef(null);
  const inputWidth = useRef(null);
  const [focusColor, setFocusColor] = useState("rgb(82, 82, 82)");
  const {
    activeChat,
    activeChats,
    selectedMsgRessources,
    attachedItem,
    setAttachedItem,
  } = chatStore();
  const { updateLootItem, activeStrains } = listsStore();
  const { setInputHeight, updateLastActive } = miscStore();
  const { info, loggedIn } = userStore();
  const [content, setContent] = useState("");
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [sendingPossible, setSendingPossible] = useState({
    state: false,
    loggedIn: false,
  });

  useEffect(() => {
    if (info != null) {
      let depthCheck = checkCorrectChatDepth(info.stats.levels, activeStrains);
      setSendingPossible({ ...sendingPossible, state: depthCheck });
    }
  }, [activeStrains, info]);

  useEffect(() => {
    setSendingPossible({ state: loggedIn, loggedIn });
  }, [loggedIn]);

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
    updateLastActive();
    const contentArray = newTrim(content).split(" ");
    var attachCheck = false;
    if (attachedItem)
      attachCheck = contentArray.includes(attachedItem.connectedString);

    //make ressourceObject
    const resObj = {};
    let res = attachCheck ? selectedMsgRessources : ["cash"];
    res.map((r) => {
      resObj[r] = { upvotes: 0, downvotes: 0 };
    });
    const msg = ChatMessage(
      resObj,
      activeChats,
      content,
      {
        nickname: info.nickname,
        id: info.uid,
        imgUrl: info.profilePicUrl,
      },
      activeChat,
      attachCheck ? [attachedItem.toObj()] : []
    );
    if (attachCheck) {
      attachedItem.attached = msg.id;
      updateLootItem(info.uid, attachedItem);
      setAttachedItem(null);
    }
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
    setInputHeight(heightSpan.current.offsetHeight);
  }, [content]);
  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        marginBottom: "5px",
        marginTop: "10px",
        backgroundColor: sendingPossible.state ? focusColor : "#6f6f6f",
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
          id="chatInput"
          ref={inputWidth}
          disabled={!sendingPossible.state}
          placeholder={
            !sendingPossible.state
              ? sendingPossible.loggedIn
                ? "Wrong strains for your level"
                : "Sign in to chat"
              : ""
          }
          onKeyDown={onEnter}
          type={"textarea"}
          className="inputField"
          style={{
            flex: 1,
            height,
            textAlign: "center",
            overflow: "hidden",
            backgroundColor: sendingPossible.state ? focusColor : "#6f6f6f",
          }}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      {sendingPossible && <InputOptionsBar height={height} />}
    </div>
  );
};

export default InputField;
