import React, { useEffect, useState } from "react";

import SearchStrainsBar from "../misc/elements/SearchStrainsBar";
import listsStore from "../stores/listsStore";
import StrainSuggestionHolder from "./holder/StrainSuggestionHolder";
import StrainSectionBar from "./StrainSectionBar";

const SuggestedStrainsBar = () => {
  const { suggestedStrains } = listsStore();
  const [activeSection, setActiveSection] = useState("Hot");
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const sections = ["Hot", "Personal", "All TIme"];

  useEffect(() => {
    setDisplayedStrains(suggestedStrains);
  }, [suggestedStrains]);
  return (
    <div
      className="divColumn"
      style={{ flex: 1, overflow: "auto", marginTop: "4px" }}
    >
      <div
        className="bgSection"
        style={{
          width: "225px",
        }}
      >
        Suggested Strains
      </div>
      <SearchStrainsBar
        setDisplayedStrains={setDisplayedStrains}
        displayedStrains={displayedStrains}
      />
      <StrainSectionBar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={sections}
      />
      <div
        className="divColumn"
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          maxHeight: "360px",
          overflow: "auto",
        }}
      >
        {displayedStrains.map((s) => {
          return <StrainSuggestionHolder key={s.id} strain={s} />;
        })}
      </div>
    </div>
  );
};

export default SuggestedStrainsBar;
