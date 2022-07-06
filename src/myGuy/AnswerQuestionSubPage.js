import React, { useState } from "react";
import { useEffect } from "react";
import useOnHover from "../hooks/useOnHover";
import { getRandomItem } from "../misc/helperFuncs";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";
import QuestionHolder from "./statementElements/QuestionHolder";
import StatementHolder from "./statementElements/StatementHolder";
import { Box, Slider } from "@mui/material";

const AnswerQuestionSubPage = () => {
  let textObj = {
    0: { english: "not important", german: "gar nicht wichitg" },
    1: { english: "a bit important", german: "ein bisschen wichtig" },
    2: { english: "kinda important", german: "ziemlich wichtig" },
    3: { english: "very important", german: "sehr wichtig" },
  };
  const [currentFlag, setCurrentFlag] = useState({
    statements: [],
    question: { english: "", german: "" },
  });
  const [answer, setAnswer] = useState({
    importance: 2,
    private: false,
    statement: null,
    answered: null,
  });
  const { fireFlags } = listsStore();
  const { info, addAnswer, myAnswers } = userStore();
  const [timeDiff, setTimeDiff] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnswer((answer) => {
        if (answer.answered != null) {
          let timeDiff = Math.round(
            (new Date().getTime() - answer.answered) / 1000
          );
          console.log("timeDiff - ", timeDiff);
          setTimeDiff(timeDiff);
        }
        return answer;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getUnansweredFlag(null, false);
  }, [fireFlags]);

  function onStatementClicked(statement) {
    let newAnswer = { ...answer, statement, answered: new Date().getTime() };
    addAnswer(info.uid, newAnswer);
    getUnansweredFlag(newAnswer.statement.id, true);
  }

  useEffect(() => {
    if (currentFlag.statements.length > 0) {
      let foundAnswer = myAnswers.find(
        (a) => a.statement.flagId == currentFlag.id
      );
      if (foundAnswer) {
        setAnswer({
          ...answer,
          importance: foundAnswer.importance,
          private: foundAnswer.private,
          statement: foundAnswer.statement,
          answered: foundAnswer.answered,
        });
      } else {
        setAnswer({
          ...answer,
          importance: 2,
          private: false,
          statement: null,
        });
      }
    }
  }, [currentFlag]);

  function getUnansweredFlag(newId, alreadySet) {
    const myStatementIds = myAnswers.map((a) => a.statement).map((s) => s.id);
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
              answer={answer}
              language={info.language}
            />
          );
        })}
      </div>
      <div className="divColumn" style={{ width: "100%", marginTop: "10px" }}>
        <div
          className="textBoldWhite"
          style={{ color: "lightgray" }}
          onClick={() => {
            console.log("currentFlag - ", currentFlag);
            console.log("answer - ", answer);
          }}
        >
          Importance
        </div>
        <Box
          style={{
            width: "100%",
            maxWidth: "200px",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <Slider
            value={answer.importance}
            onChange={(e) => {
              setAnswer({ ...answer, importance: e.target.value });
            }}
            valueLabelDisplay="off"
            step={1}
            min={0}
            max={3}
          />
        </Box>
        <div className="textWhite" style={{ fontStyle: "italic" }}>
          {textObj[answer.importance][info.language]}
        </div>
      </div>
      <QuestionBottomHolder
        getUnansweredFlag={getUnansweredFlag}
        currentFlag={currentFlag}
        answer={answer}
        setAnswer={setAnswer}
        timeDiff={timeDiff}
      />
    </div>
  );
};

const QuestionBottomHolder = ({
  currentFlag,
  answer,
  setAnswer,
  timeDiff,
  getUnansweredFlag,
}) => {
  const [foundAnswer, setFoundAnswer] = useState({ active: null });
  const [answerTheSame, setAnswerTheSame] = useState(true);
  const { myAnswers, info, addAnswer } = userStore();

  const setPrivate = () => {
    setAnswer({ ...answer, private: !answer.private });
  };

  const saveAnswer = () => {
    addAnswer(info.uid, { ...answer, answered: new Date().getTime() });
    getUnansweredFlag(answer.statement.id, true);
  };

  const hover = useOnHover({
    item: answer.private ?? false,
    active: true,
  });
  useEffect(() => {
    var found = myAnswers.find((a) => a.statement.flagId == currentFlag.id);
    setFoundAnswer(found);
    console.log("foundAnswer - ", foundAnswer, " | answer - ", answer.private);
    if (found) {
      setAnswerTheSame(
        found.importance == (answer.importance ?? 0) &&
          found.private == (answer.private ?? false)
      );
    }
  }, [answer, myAnswers]);
  return (
    <div
      className="divRow"
      style={{ height: "100%", alignItems: "end", width: "100%" }}
    >
      <div
        onClick={setPrivate}
        {...hover.divProps}
        className="divRow"
        style={{ marginBottom: "20px", marginLeft: "20px", flex: 1 }}
      >
        {hover.checkbox}
        <div className="textBoldWhite" style={{ marginLeft: "10px" }}>
          Hide Answer
        </div>
        <img src="/images/icons/icon_private.png" className="icon30" />
      </div>
      <div
        className="divRow"
        style={{
          marginBottom: "20px",
          flex: 2,
          justifyContent: "center",
        }}
      >
        <div
          className="textWhite"
          style={{ textAlign: "center", maxWidth: "200px", overflow: "auto" }}
        >
          {timeDiff - 600 > 0
            ? !answerTheSame
              ? "Save Changes"
              : ""
            : `You have to wait another ${600 - timeDiff} to change the answer`}
        </div>
      </div>
      <div className="divRow" style={{ justifyContent: "end" }}>
        {currentFlag.statements
          .map((s) => s.id)
          .some((id) =>
            myAnswers
              .map((a) => a.statement)
              .map((s) => s.id)
              .includes(id)
          ) && (
          <img
            src={
              answerTheSame
                ? "/images/icons/icon_checkmark.png"
                : "/images/icons/icon_thumbs_up.png"
            }
            className="icon40"
            onClick={
              answerTheSame
                ? null
                : () => {
                    if (timeDiff - 600 > 0) saveAnswer();
                  }
            }
            style={{
              marginRight: "20px",
              marginBottom: "20px",
              filter: timeDiff - 600 < 0 ? "grayscale(100%)" : null,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AnswerQuestionSubPage;
