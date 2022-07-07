import React from "react";

const OverallComparissonSection = ({ comparisson, userImage }) => {
  console.log("comparisson - ", comparisson);
  return (
    <div className="divColumn" style={{ width: "100%" }}>
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <img
          src={
            userImage ? userImage : "/images/drawable/icon_question_mark.png"
          }
          className="icon30"
        />
        <div className="textBoldWhite" style={{ marginLeft: "5px" }}>
          {(comparisson ?? { name: "" }).name}
        </div>
      </div>
      <div className="divRow">
        <div
          className="textBoldWhite"
          style={{ color: "lightgray", fontSize: "12px" }}
        >
          Compared answers
        </div>
        <div className="textBoldWhite" style={{ marginLeft: "5px" }}>
          {(comparisson ? comparisson.statements : []).length}
        </div>
      </div>
      <div className="divRow" style={{ width: "100%" }}>
        <OverallHolder
          overall={
            (
              comparisson ?? {
                overallScore: {
                  user: { score: 0, possible: 0 },
                  otherUser: { score: 0, possible: 0 },
                },
              }
            ).overallScore
          }
        />
      </div>
    </div>
  );
};

const OverallHolder = ({ overall }) => {
  return (
    <div className="divColumn" style={{ marginTop: "2px", width: "100%" }}>
      <div
        className="textBoldWhite"
        style={{ color: "lightgray", fontSize: "14px" }}
      >
        Scored
      </div>
      <div className="textBoldWhite">{overall.user.score}</div>

      <div
        className="textBoldWhite"
        style={{ color: "lightgray", fontSize: "14px" }}
      >
        Max possible
      </div>
      <div className="textBoldWhite">{overall.user.possible}</div>
      <div className="divRow" style={{ marginTop: "10px" }}>
        <div
          className="textBoldWhite"
          style={{ fontSize: "12px", color: "lightgray" }}
        >
          for the other user -
        </div>
        <div className="textBoldWhite" style={{ marginLeft: "5px" }}>
          {overall.otherUser.score}/{overall.otherUser.possible}
        </div>
      </div>
    </div>
  );
};

export default OverallComparissonSection;
