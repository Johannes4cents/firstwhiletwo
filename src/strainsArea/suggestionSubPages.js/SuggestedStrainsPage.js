import React, { useEffect, useState } from "react";
import listsStore from "../../stores/listsStore";
import StrainSuggestionHolder from "../holder/StrainSuggestionHolder";

const SuggestedStrainsPage = () => {
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const { allStrains } = listsStore();

  useEffect(() => {
    setDisplayedStrains(allStrains);
  }, [allStrains]);
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
