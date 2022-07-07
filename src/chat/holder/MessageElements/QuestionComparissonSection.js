import React, { useEffect, useState } from "react";
import HoverArrow from "../../../misc/elements/HoverArrow";
import { getSingleDocFromFirestore } from "../../../misc/handleFirestore";
import listsStore from "../../../stores/listsStore";
import ComparedQuestionHolder from "./ComparedQuestionHolder";

const QuestionComparissonSection = ({ comparisson }) => {
  const [currentFlag, setCurrentFlag] = useState(null);
  const [statements, setStatements] = useState([]);
  const { fireFlags } = listsStore();

  function setFlag(flagId) {
    let flag = fireFlags.find((f) => f.id == flagId);
    console.log("flag - ", flag);
    setCurrentFlag(flag);
  }

  function clickArrow(direction) {}

  useEffect(() => {
    if (comparisson) {
      if (comparisson.statements) {
        let sortedStatements = comparisson.statements.sort((a, b) =>
          a.importance.user < b.importance.user ? 1 : -1
        );
        setStatements(sortedStatements);
        setFlag(sortedStatements[0].flagId);
      }
    }
  }, [comparisson]);

  return (
    <div
      className="divRow"
      style={{ width: "100%", height: "100%", justifyContent: "space-between" }}
    >
      <HoverArrow
        upDown={-1}
        onArrowClicked={clickArrow}
        size={25}
        margins={{ left: 20, right: 0 }}
      />
      <ComparedQuestionHolder flag={currentFlag} />
      <HoverArrow
        upDown={1}
        onArrowClicked={clickArrow}
        size={25}
        margins={{ left: 0, right: 20 }}
      />
    </div>
  );
};

export default QuestionComparissonSection;
