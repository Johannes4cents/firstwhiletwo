import React, { useState } from "react";
import AnswerQuestionSubPage from "./AnswerQuestionSubPage";
import StatementSubPage from "./StatementSubPage";
import SubOptionsBar from "./SubOptionsBar";

const StatementsPage = () => {
  const catList = ["Statements", "Answer Questions"];
  const [selectedCat, setSelectedCat] = useState("Statements");
  return (
    <div className="sectionBg">
      <SubOptionsBar
        catList={catList}
        setSelectedCat={setSelectedCat}
        selectedCat={selectedCat}
      />
      {selectedCat == "Statements" && <StatementSubPage />}
      {selectedCat == "Answer Questions" && <AnswerQuestionSubPage />}
    </div>
  );
};

export default StatementsPage;
