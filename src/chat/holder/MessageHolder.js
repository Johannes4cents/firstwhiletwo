import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { storage } from "../../firebase/fireInit";
import { timestampToChatDate } from "../../misc/helperFuncs";
import VoteRessourceArrows from "../VoteRessourceArrows";

const MessageHolder = ({ message }) => {
  const profilePic = useRef(null);
  const [hover, setHover] = useState(false);

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

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="divRow"
      style={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: hover ? "grey" : "",
        alignItems: "baseline",
      }}
    >
      <img
        ref={profilePic}
        src="/images/drawable/icon_unknown.png"
        className="icon30"
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
