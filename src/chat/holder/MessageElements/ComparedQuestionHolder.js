import React, { useEffect } from "react";
import userStore from "../../../stores/userStore";
import ComparedStatementHolder from "./ComparedStatementHolder";

const ComparedQuestionHolder = ({ flag }) => {
  const { info } = userStore();
  useEffect(() => {
    console.log("flag - ", flag);
  }, [flag]);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {flag.flag && (
        <div
          className="divColumn"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div
            className="divColumn"
            style={{
              marginTop: "10px",
              backgroundColor: "#3A3A3A",
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 5,
              paddingRight: 5,
              borderRadius: "1rem/1rem",
              border: "1px solid grey",
            }}
          >
            <div className="textBoldWhite">
              {flag.flag.question[info.language ?? "english"]}
            </div>
          </div>

          <div
            className="divColumn"
            style={{ height: "100%", justifyContent: "space-evenly" }}
          >
            {flag.flag.statements.map((s) => {
              return (
                <ComparedStatementHolder
                  key={s.id}
                  statement={s}
                  userStatement={flag.statement.statements.user}
                  otherUserStatement={flag.statement.statements.otherUser}
                />
              );
            })}
          </div>
          <div className="textBoldWhite">Importance</div>
          <div
            className="divRow"
            style={{ width: "100%", justifyContent: "space-around" }}
          >
            <ImportanceHolder
              user="You"
              importance={flag.statement.importance.user}
            />
            <ImportanceHolder
              user="Other user"
              importance={flag.statement.importance.otherUser}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ImportanceHolder = ({ importance, user }) => {
  return (
    <div className="divColumn" style={{ flex: 1 }}>
      <div
        className="textBoldWhite"
        style={{ color: "lightgray", fontSize: "14px", textAlign: "center" }}
      >
        {user}
      </div>
      <div className="textBoldWhite" style={{ textAlign: "center" }}>
        {importance}
      </div>
    </div>
  );
};

export default ComparedQuestionHolder;
