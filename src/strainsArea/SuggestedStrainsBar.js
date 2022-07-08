import React, { useEffect, useState } from "react";

import SearchStrainsBar from "../misc/elements/SearchStrainsBar";
import listsStore from "../stores/listsStore";
import StrainSuggestionHolder from "./holder/StrainSuggestionHolder";
import StrainSectionBar from "./StrainSectionBar";
import HotChatsPage from "./suggestionSubPages.js/HotChatsPage";
import PersonalSuggestionsPage from "./suggestionSubPages.js/PersonalSuggestionsPage";
import SuggestedStrainsPage from "./suggestionSubPages.js/SuggestedStrainsPage";

const SuggestedStrainsBar = () => {
  const { allStrains } = listsStore();
  const [activeSection, setActiveSection] = useState("Hot");
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const sections = ["Hot", "Personal", "Strains"];

  const sectionHolder = {
    Hot: <HotChatsPage />,
    Personal: <PersonalSuggestionsPage />,
    Strains: <SuggestedStrainsPage />,
  };

  useEffect(() => {
    setDisplayedStrains(allStrains);
  }, [allStrains]);
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
        Suggested
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
      {sectionHolder[activeSection]}
    </div>
  );
};

export default SuggestedStrainsBar;
