import React from "react";
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
  const modal = useModal({
    modalContent: (
      <CompareUserModal
        otherId={message.author.id}
        userImage={message.author.imgUrl}
      />
    ),
    center: true,
    darkOverlay: true,
  });

  function compareUser(otherId) {
    modal.open();
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
