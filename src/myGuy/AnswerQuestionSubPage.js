import React, { useState } from "react";
import { useEffect } from "react";
import useOnHover from "../hooks/useOnHover";
import { getRandomItem } from "../misc/helperFuncs";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";
import QuestionHolder from "./statementElements/QuestionHolder";
import StatementHolder from "./statementElements/StatementHolder";

const AnswerQuestionSubPage = () => {
  const [currentFlag, setCurrentFlag] = useState({
    statements: [],
    question: { english: "", german: "" },
  });
  const { fireFlags } = listsStore();
  const { info, addStatement, myStatements } = userStore();

  useEffect(() => {
    getUnansweredFlag(null, false);
  }, [fireFlags]);

  function onStatementClicked(statement) {
    addStatement(info.uid, statement);
    getUnansweredFlag(statement.id, true);
  }

  function getUnansweredFlag(newId, alreadySet) {
    const myStatementIds = myStatements.map((s) => s.id);
    if (newId) myStatementIds.push(newId);
    let nonAnsweredQuestion = fireFlags.find((f) =>
      f.statements.map((s) => s.id).every((id) => !myStatementIds.includes(id))
    );
    if (nonAnsweredQuestion) {
      setCurrentFlag(nonAnsweredQuestion);
    } else {
      if (alreadySet) otherItem(1);
      else setCurrentFlag(getRandomItem(fireFlags));
    }
  }

  function otherItem(number) {
    let flagIndex = fireFlags.indexOf(currentFlag);
    var index = Math.abs((flagIndex + number) % fireFlags.length);
    if (flagIndex + number < 0) index = fireFlags.length - 1;
    console.log("flagIndex  - ", flagIndex, " | index - ", index);
    setCurrentFlag(fireFlags[index]);
  }

  return (
    <div className="divColumn" style={{ width: "100%", height: "100%" }}>
      <div
        className="divRow"
        style={{ width: "100%", justifyContent: "space-between" }}
      >
        <img
          src="/images/drawable/arrow_left.png"
          className="icon20"
          onClick={() => {
            otherItem(-1);
          }}
        />
        <QuestionHolder fireFlag={currentFlag} language={info.language} />
        <img
          src="/images/drawable/arrow_right.png"
          className="icon20"
          onClick={() => {
            otherItem(1);
          }}
        />
      </div>
      <div className="divColumn" style={{ marginTop: "5px", width: "100%" }}>
        {currentFlag.statements.map((s, index) => {
          return (
            <StatementHolder
              onStatementClicked={onStatementClicked}
              index={index}
              key={s.id}
              statement={s}
              language={info.language}
            />
          );
        })}
      </div>
      {currentFlag.statements
        .map((s) => s.id)
        .some((id) => myStatements.map((s) => s.id).includes(id)) && (
        <CheckMarkHolder />
      )}
    </div>
  );
};

const CheckMarkHolder = () => {
  return (
    <div
      className="divRow"
      style={{ height: "100%", alignItems: "end", width: "100%" }}
    >
      <div className="divRow" style={{ flex: 1, justifyContent: "end" }}>
        <img
          src="/images/icons/icon_checkmark.png"
          className="icon40"
          style={{ marginRight: "20px", marginBottom: "20px" }}
        />
      </div>
    </div>
  );
};

export default AnswerQuestionSubPage;
