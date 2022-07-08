import React from "react";
import userStore from "../../../stores/userStore";

const ComparedStatementHolder = ({
  statement,
  userStatement,
  otherUserStatement,
}) => {
  const { info } = userStore();
  return (
    <div className="divRow" style={{ width: "100%" }}>
      {userStatement == statement.id && (
        <img
          src="/images/icons/icon_user.png"
          className="icon20"
          style={{ marginRight: "15px" }}
        />
      )}
      <div
        className="textBoldWhite"
        style={{
          flex: 1,
          textAlign: "center",
          color:
            userStatement == otherUserStatement && userStatement == statement.id
              ? "#00ff00"
              : userStatement == statement.id
              ? "lightgreen"
              : otherUserStatement == statement.id
              ? "#EE6666"
              : "white",
        }}
      >
        {statement.text[info.language ?? "english"]}
      </div>
      {otherUserStatement == statement.id && (
        <img
          src="/images/icons/icon_other_user.png"
          className="icon20"
          style={{ marginLeft: "15px" }}
        />
      )}
    </div>
  );
};

export default ComparedStatementHolder;
