import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useSpring } from "react-spring";
import { storage } from "../../firebase/fireInit";
import { timestampToChatDate } from "../../misc/helperFuncs";
import VoteRessourceArrows from "../VoteRessourceArrows";
import ItemMessageHolder from "./ItemMessageHolder";

const MessageHolder = ({ message }) => {
  const profilePic = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {}, [message]);

  useEffect(() => {
    if (profilePic != null) {
      if (message.author.imgUrl != null) {
        getDownloadURL(ref(storage, message.author.imgUrl)).then((url) => {
          if (profilePic.current != null)
            profilePic.current.setAttribute("src", url);
        });
      }
    }
  }, [profilePic]);

  const onItemClicked = (item) => {
    console.log("item is - ", item);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="divRow"
      style={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: hover ? "grey" : "",
      }}
    >
      <img
        ref={profilePic}
        src="/images/drawable/icon_unknown.png"
        className="icon30"
        style={{ marginRight: "10px" }}
      />
      <div
        className="divColumn"
        style={{ width: "100%", alignItems: "baseline" }}
      >
        <div className="divRow" style={{ marginBottom: "3px", width: "100%" }}>
          <div className="textBoldWhite">{message.author.nickname}</div>
          <div
            className="textWhite"
            style={{
              marginLeft: "5px",
              fontSize: "11px",
              color: "lightgray",
              fontStyle: "italic",
            }}
          >
            {timestampToChatDate(message.timestamp)}
          </div>
        </div>
        <div className="textWhite">{message.msg}</div>
      </div>
      <div style={{ flex: 1 }} />
      <div
        className="divRow"
        style={{ justifyContent: "center", marginRight: "20px" }}
      >
        {(message.spawnedItems ?? []).map((i) => {
          return (
            <ItemMessageHolder
              item={i}
              key={i.id}
              onItemClicked={onItemClicked}
            />
          );
        })}
      </div>
      <div className="divColumn">
        {(message.ressources ?? []).map((r) => {
          return (
            <VoteRessourceArrows
              key={r.ressource}
              ressource={r.ressource}
              message={message}
              hover={hover}
              setHover={setHover}
              index={r.index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageHolder;
