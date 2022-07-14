import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase/fireInit";
import { objectToArray, timestampToChatDate } from "../../misc/helperFuncs";
import VoteRessourceArrows from "../VoteRessourceArrows";
import ItemMessageHolder from "./ItemMessageHolder";

import AttachedItemHolder from "./AttachedMessageHolder";
import MessageMediaField from "./MessageMediaField";
import MessageNickField from "./MessageElements/MessageNickField";

const MessageHolder = ({ message, lastMsg }) => {
  const [chained, setChained] = useState(false);
  const messageDiv = useRef();
  const profilePic = useRef(null);

  const [hover, setHover] = useState(false);

  useEffect(() => {
    console.log("lastMsg == message.id - ", lastMsg == message.author.id);
    if (lastMsg) {
      if (lastMsg == message.author.id) setChained(true);
    }
  }, [message, lastMsg]);

  useEffect(() => {
    if (profilePic != null) {
      if (message.author.imgUrl != null) {
        getDownloadURL(ref(storage, message.author.imgUrl)).then((url) => {
          console.log("url is - ", url);
          if (profilePic.current != null)
            profilePic.current.setAttribute("src", url);
        });
      }
    }
  }, [profilePic]);

  const onTextClicked = () => {
    console.log("message - ", message);
  };

  return (
    <div
      className="divColumn"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: hover ? "grey" : "",
      }}
    >
      <div
        className="divRow"
        style={{
          width: "100%",
          backgroundColor: hover ? "grey" : "",
        }}
      >
        {!chained && (
          <img
            ref={profilePic}
            src="/images/drawable/icon_unknown.png"
            className="icon30"
            style={{ marginRight: "10px" }}
          />
        )}
        {chained && <div style={{ width: "30px" }} />}

        <div
          ref={messageDiv}
          className="divColumn"
          style={{ flex: 1, alignItems: "baseline" }}
        >
          {!chained && <MessageNickField message={message} />}

          <div className="divColumn" style={{ width: "100%" }}>
            {(message.attachedItems ?? []).length > 0 &&
              message.attachedItems.map((i) => (
                <AttachedItemHolder key={i.id} item={i} />
              ))}
          </div>
          {(message.imgUrls ?? []).length > 0 && (
            <MessageMediaField
              message={message}
              upvoteAreaWidth={
                (objectToArray(message.ressources) ?? []).length * 115
              }
            />
          )}
          <div
            className="textWhite"
            onClick={onTextClicked}
            style={{ flex: 1 }}
          >
            {message.msg}
          </div>
        </div>

        {(message.spawnedItems ?? []).length > 0 && (
          <div
            className="divRow"
            style={{ justifyContent: "center", marginRight: "20px" }}
          >
            {(message.spawnedItems ?? []).map((i) => {
              return (
                <ItemMessageHolder item={i} key={i.id} message={message} />
              );
            })}
          </div>
        )}

        <div
          className="ressourceContainer"
          style={{
            marginRight: "5px",
            height: messageDiv.current
              ? messageDiv.current.offsetHeight + 15
              : "",
            width: `${
              (message.ressources
                ? objectToArray(message.ressources).length
                : 1) * 115
            }px`,
          }}
        >
          {hover &&
            objectToArray(message.ressources).map((r) => {
              return (
                <VoteRessourceArrows
                  key={r.key}
                  dbVotes={r.value}
                  ressource={r.key}
                  message={message}
                  hover={hover}
                  setHover={setHover}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MessageHolder;
