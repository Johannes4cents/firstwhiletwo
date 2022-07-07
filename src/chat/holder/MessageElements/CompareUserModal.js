import React, { useEffect } from "react";
import { useState } from "react";
import { getSingleDocFromFirestore } from "../../../misc/handleFirestore";
import SubOptionsBar from "../../../myGuy/SubOptionsBar";
import listsStore from "../../../stores/listsStore";
import OverallComparissonSection from "./OverallComparissonSection";

const CompareUserModal = ({ otherId, userImage }) => {
  const [comparisson, setComparisson] = useState(null);
  const [selectedCat, setSelectedCat] = useState("overall");
  const { userComparissons } = listsStore();
  const catList = ["overall", "questions"];

  useEffect(() => {
    let foundComparisson = userComparissons.find((c) => c.id == otherId);
    console.log(
      "userComparissons - ",
      userComparissons,
      " | foundComparisson - ",
      foundComparisson
    );
    if (foundComparisson) setComparisson(foundComparisson);
    else {
      getSingleDocFromFirestore("users", otherId, (user) => {
        // TO DO - make comparisson if user is not found but has answered questions
      });
    }
  }, [otherId]);
  return (
    <div
      className="divColumn"
      style={{
        width: "400px",
        height: "200px",
        backgroundColor: "#5f5f5f",
        zIndex: 99999,
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
    </div>
  );
};

export default CompareUserModal;
