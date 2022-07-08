import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "../fire_classes/ChatMessage";
import useWindowSize from "../hooks/useWindowSize";
import { cloudFunc, setDocInFirestore } from "../misc/handleFirestore";
import { forArrayLength, getRandomId, newTrim } from "../misc/helperFuncs";
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
    currentMessage,
    setMessageContent,
    resetCurrentMessage,
  } = chatStore();
  const { updateLootItem, activeStrains } = listsStore();
  const { setInputHeight, updateLastActive, setInputWidth } = miscStore();
  const windowsize = useWindowSize();
  const { info, loggedIn, myAnswers } = userStore();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [sendingPossible, setSendingPossible] = useState({
    state: false,
    loggedIn: false,
  });

  useEffect(() => {
    if (info != null) {
      let depthCheck = checkCorrectChatDepth(info.stats.levels, activeStrains);
      setSendingPossible({ loggedIn, state: depthCheck });
    }
  }, [activeStrains, info, loggedIn]);

  useEffect(() => {
    setSendingPossible({ state: loggedIn, loggedIn });
  }, [loggedIn]);

  const onEnter = (e) => {
    if (
      e.key == "Enter" &&
      !e.shiftKey &&
      (currentMessage.msg.length > 0 || currentMessage.attachedMedia.length > 0)
    ) {
      e.preventDefault();
      submitMsg();
    } else if (e.key == "Enter" && e.shiftKey) {
      setMessageContent(currentMessage.msg + "\n", true);
    }
  };

  const submitMsg = () => {
    updateLastActive();
    const contentArray = newTrim(currentMessage.msg).split(" ");
    var attachedItems = [];
    var ressources = [];

    forArrayLength(currentMessage.attachedItems, (item) => {
      if (contentArray.includes(item.connectedString)) {
        ressources.concat(item.upvotes);
        attachedItems.push(item);
        item.attached = currentMessage.id;
        updateLootItem(info.uid, item);
      }
    });

    const resObj = {};
    let chatRessources =
      [...new Set(ressources)].length > 0
        ? [...new Set(ressources)]
        : currentMessage.ressources;

    chatRessources.map((r) => {
      resObj[r] = { upvotes: 0, downvotes: 0 };
    });

    currentMessage.ressources = resObj;
    currentMessage.chats = activeChats;
    currentMessage.author = {
      nickname: info.nickname,
      id: info.uid,
      imgUrl: info.profilePicUrl,
    };
    currentMessage.postedIn = activeChat;
    currentMessage.attachedItems = attachedItems;

    var tries = 0;
    if (currentMessage.attachedMedia.length > 0) {
      while (
        currentMessage.imgUrls.length != currentMessage.attachedMedia.length ||
        tries > 20
      ) {
        setTimeout(() => {
          tries++;
        }, 100);
      }
    }
    delete currentMessage.attachedMedia;
    // add timestamp for sorting
    addMediaToFirestore(currentMessage.imgUrls);
    currentMessage.collection = "turfChats/" + activeChat + "/messages";
    currentMessage.answers = myAnswers;
    const onSend = () => {};
    const onError = (e) => {
      console.log("e - ", e);
    };
    cloudFunc("postMessage", currentMessage, onSend, onError);

    resetCurrentMessage();
  };

  function addMediaToFirestore(mediaList) {}

  useEffect(() => {
    if (inputWidth != null) {
      setWidth(inputWidth.current.offsetWidth);
    }
  }, [inputWidth]);

  useEffect(() => {
    setInputWidth(inputWidth.current.offsetWidth);
  }, [windowsize]);

  useEffect(() => {
    setHeight(heightSpan.current.offsetHeight);
    setInputHeight(heightSpan.current.offsetHeight);
  }, [currentMessage.msg]);
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
          {currentMessage.msg}
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
          value={currentMessage.msg}
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
        />
      </div>
      {sendingPossible && <InputOptionsBar height={height} />}
    </div>
  );
};

export default InputField;
