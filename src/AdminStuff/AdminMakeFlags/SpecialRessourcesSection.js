import React, { useState } from "react";
import { makeSpecialRessource } from "../../fire_classes/Flag";
import CurrentSpecialSection from "./CurrentSpecialSection";
import SpecialRessouresList from "./SpecialRessouresList";

const SpecialRessourcesSection = ({ dragAble }) => {
  const [currentSpecial, setCurrentSpecial] = useState(makeSpecialRessource());

  function onSpecialClicked(sr) {
    setCurrentSpecial(sr);
  }
  return (
    <div className="divColumn" style={{ marginLeft: "20px", width: "300px" }}>
      <CurrentSpecialSection
        currentSpecial={currentSpecial}
        setCurrentSpecial={setCurrentSpecial}
      />
      <SpecialRessouresList onSpecialClicked={onSpecialClicked} />
    </div>
  );
};

export default SpecialRessourcesSection;
