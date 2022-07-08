import React, { useEffect, useState } from "react";
import useModal from "../../../hooks/useModal";
import useOnHover from "../../../hooks/useOnHover";
import {
  makeHoverOption,
  showUserComparisson,
  timestampToChatDate,
} from "../../../misc/helperFuncs";
import listsStore from "../../../stores/listsStore";
import CompareUserModal from "./CompareUserModal";

const MessageNickField = ({ message }) => {
  const [comparedUser, setComparedUser] = useState({ id: "", imgUrl: "" });
  const modal = useModal({
    modalContent: (
      <CompareUserModal
        otherId={comparedUser.id}
        userImage={compareUser.imgUrl}
        answers={message.answers ?? []}
        uniqueName={message.author.uniqueName ?? message.author.nickname}
      />
    ),
    password: message.id,
    center: true,
    darkOverlay: true,
  });

  useEffect(() => {
    setComparedUser({ id: message.author.id, imgUrl: message.author.imgUrl });
  }, [message]);

  function compareUser() {
    modal.open(message.id);
  }
  const hover = useOnHover({
    hoverOptions: {
      options: [
        makeHoverOption(
          "compare answers",
          compareUser,
          message.author.id,
          "/images/icons/icon_compare.png"
        ),
      ],
    },
  });
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{ marginBottom: "3px", width: "100%" }}
    >
      <div className="textBoldWhite">{message.author.nickname}</div>
      <div className="divRow" style={{ marginLeft: "5px" }}>
        <div
          className="textWhite"
          style={{
            fontSize: "11px",
            color: "lightgray",
            fontStyle: "italic",
          }}
        >
          {timestampToChatDate(message.timestamp)}
        </div>
      </div>

      <div
        className="divRow"
        style={{
          marginLeft: "5px",
          backgroundColor: "lightgray",
          borderRadius: "0.5rem/1rem",
          display: "flex",
          height: "100%",
        }}
      >
        <div
          style={{
            color: "grey",
            fontSize: "12px",
            height: "auto",
          }}
        >
          {message.postedIn}
        </div>
      </div>
      {hover.hoverMenu}
      {modal.element}
    </div>
  );
};

export default MessageNickField;
