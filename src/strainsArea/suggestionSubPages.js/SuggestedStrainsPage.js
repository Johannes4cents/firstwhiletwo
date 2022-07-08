import React, { useState } from "react";
import StrainSuggestionHolder from "../holder/StrainSuggestionHolder";

const SuggestedStrainsPage = () => {
  const [displayedStrains, setDisplayedStrains] = useState([]);
  return (
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
  );
};

export default SuggestedStrainsPage;
