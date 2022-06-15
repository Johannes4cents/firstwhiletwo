import React from "react";

const CreateFlagQuestionBar = ({ fireFlag, setFireFlag }) => {
  return (
    <div className="divRowColored" style={{ marginBottom: "20px" }}>
      <div className="divColumn" style={{ width: "100%" }}>
        <div className="textBoldWhite">Question Eng</div>
        <input
          style={{ textAlign: "center", width: "400px" }}
          value={fireFlag.question.english}
          onChange={(e) =>
            setFireFlag({
              ...fireFlag,
              question: { ...fireFlag.question, english: e.target.value },
            })
          }
        />
      </div>
      <div className="divColumn" style={{ width: "100%" }}>
        <div className="textBoldWhite">Question Ger</div>
        <input
          style={{ textAlign: "center", width: "400px" }}
          value={fireFlag.question.german}
          onChange={(e) =>
            setFireFlag({
              ...fireFlag,
              question: { ...fireFlag.question, german: e.target.value },
            })
          }
        />
      </div>
    </div>
  );
};

export default CreateFlagQuestionBar;
