import React, { useState } from "react";
import SubOptionsBar from "../myGuy/SubOptionsBar";
import ChipsSubPage from "./SubPages/ChipsSubPage";
import LevelsSupPage from "./SubPages/LevelsSupPage";
import RessourcesSubPage from "./SubPages/RessourcesSubPage";

const StatsPageGuy = () => {
  const [selectedCat, setSelectedCat] = useState("Ressources");

  const cats = ["Ressources", "Chips", "Levels"];

  return (
    <div className="sectionBg" style={{ overflowY: "auto" }}>
      <SubOptionsBar
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        catList={cats}
      />
      {selectedCat == "Ressources" && <RessourcesSubPage />}
      {selectedCat == "Chips" && <ChipsSubPage />}
      {selectedCat == "Levels" && <LevelsSupPage />}
    </div>
  );
};

export default StatsPageGuy;
