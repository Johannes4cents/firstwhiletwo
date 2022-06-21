import React, { useState } from "react";
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
    </div>
  );
};

export default StatementsPage;
