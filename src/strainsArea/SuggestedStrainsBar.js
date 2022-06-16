import React, { useEffect, useState } from "react";

import SearchStrainsBar from "../misc/elements/SearchStrainsBar";
import listsStore from "../stores/listsStore";
import StrainSuggestionHolder from "./holder/StrainSuggestionHolder";

const SuggestedStrainsBar = () => {
  const { strainWords } = listsStore();

  const [displayedStrains, setDisplayedStrains] = useState([]);

  useEffect(() => {
    setDisplayedStrains(strainWords);
  }, [strainWords]);
  return (
    <div className="divColumn" style={{ flex: 1, overflow: "auto" }}>
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
      <div
        className="divColumn"
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          maxHeight: "380px",
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
