import React, { useState } from "react";
import { timestampToChatDate } from "../../misc/helperFuncs";

const MessageHolder = ({ message }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="divColumn"
      style={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: hover ? "grey" : "",
        alignItems: "baseline",
      }}
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
  );
};

export default MessageHolder;
