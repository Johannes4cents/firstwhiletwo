import React, { useEffect } from "react";
import { useState } from "react";
import { user } from "../../../firebase/fireInit";
import { getSingleDocFromFirestore } from "../../../misc/handleFirestore";
import { compareUser } from "../../../misc/helperFuncs";
import SubOptionsBar from "../../../myGuy/SubOptionsBar";
import listsStore from "../../../stores/listsStore";
import userStore from "../../../stores/userStore";
import OverallComparissonSection from "./OverallComparissonSection";
import QuestionComparissonSection from "./QuestionComparissonSection";

const CompareUserModal = ({ otherId, userImage, answers, uniqueName }) => {
  const [comparisson, setComparisson] = useState(null);
  const [selectedCat, setSelectedCat] = useState("overall");
  const { myAnswers } = userStore();
  const catList = ["overall", "questions"];

  useEffect(() => {
    console.log("test");
    let user = { id: otherId, name: uniqueName, statements: answers };
    setComparisson(compareUser(user, myAnswers, "id"));
  }, [myAnswers]);
  return (
    <div
      className="divColumn"
      style={{
        width: "400px",
        height: "200px",
        backgroundColor: "#5f5f5f",
        zIndex: 99999,
        borderRadius: "1rem/1rem",
        border: "1px solid darkgray",
      }}
    >
      <div className="textBoldWhite">Answers Compared</div>
      <SubOptionsBar
        catList={catList}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
      />
      {selectedCat == "overall" && (
        <OverallComparissonSection
          comparisson={comparisson}
          userImage={userImage}
        />
      )}
      {selectedCat == "questions" && (
        <QuestionComparissonSection comparisson={comparisson} />
      )}
    </div>
  );
};

export default CompareUserModal;
