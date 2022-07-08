import React, { useCallback, useEffect, useState } from "react";
import { animated, useTransition, useSpringRef } from "react-spring";
import HoverArrow from "../../../misc/elements/HoverArrow";
import listsStore from "../../../stores/listsStore";
import ComparedQuestionHolder from "./ComparedQuestionHolder";

const QuestionComparissonSection = ({ comparisson }) => {
  const [currentFlag, setCurrentFlag] = useState({
    flag: null,
    statement: null,
  });

  const [statements, setStatements] = useState([]);
  const [[index, dir], setIndex] = useState([0, 0]);
  const { fireFlags } = listsStore();

  const handleNextSlide = useCallback(
    (dir) => {
      setIndex((state) => {
        return [(state[0] + dir + statements.length) % statements.length, dir];
      });
    },
    [statements]
  );

  function setFlag(statement) {
    let flag = fireFlags.find((f) => f.id == statement.flagId);
    setCurrentFlag({ flag, statement });
  }

  useEffect(() => {
    if (statements.length > 0) {
      let currentStatement = statements[index];
      setFlag(currentStatement);
    }
  }, [index]);

  useEffect(() => {
    if (comparisson) {
      if (comparisson.statements) {
        let sortedStatements = comparisson.statements.sort((a, b) =>
          a.importance.user < b.importance.user ? 1 : -1
        );
        setStatements(sortedStatements);
        setFlag(sortedStatements[0]);
      }
    }
  }, [comparisson]);

  return (
    <div
      className="divRow"
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <HoverArrow
        upDown={-1}
        onArrowClicked={handleNextSlide}
        size={25}
        margins={{ left: 20, right: 0 }}
      />
      <ComparedQuestionHolder flag={currentFlag} />

      <HoverArrow
        upDown={1}
        onArrowClicked={handleNextSlide}
        size={25}
        margins={{ left: 0, right: 20 }}
      />
    </div>
  );
};

export default QuestionComparissonSection;
