import React, { useEffect, useState } from "react";
import { makeStrain } from "../fire_classes/Strain";
import SearchBar from "../misc/elements/SearchBar";
import {
  deleteDocInFirestore,
  deleteItemInGeneralList,
  deleteItemInUserList,
} from "../misc/handleFirestore";
import listsStore from "../stores/listsStore";
import userStore from "../stores/userStore";
import StrainSuggestionHolder from "./holder/StrainSuggestionHolder";

const SuggestedStrainsBar = () => {
  const { addMyStrain, strainWords, addRemoveStrainWord } = listsStore();
  const { info } = userStore();
  const [displayedStrains, setDisplayedStrains] = useState([]);
  const [strainInput, setStrainInput] = useState("");
  const [resetSearchTrigger, setResetSearchTrigger] = useState(null);

  const onSearchFunc = (result) => {
    setStrainInput(result);
    if (result.length > 0)
      setDisplayedStrains(
        strainWords.filter((s) =>
          s.text.toLowerCase().startsWith(result.toLowerCase())
        )
      );
    else setDisplayedStrains(strainWords);
  };

  const makeNewStrain = () => {
    if (displayedStrains.length < 1 && strainInput.length > 0) {
      makeStrain(info.uid, strainInput, addMyStrain, addRemoveStrainWord);
    }
  };

  const onInputEnter = (e) => {
    if (e.key == "Enter") {
      makeNewStrain();
      setStrainInput("");
      setResetSearchTrigger({});
    }
  };

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
      <div className="divRow">
        <SearchBar
          onSearchFunc={onSearchFunc}
          onEnter={onInputEnter}
          resetSearchTrigger={resetSearchTrigger}
        />
        <img
          src={
            displayedStrains.length < 1 && strainInput.length > 0
              ? "/images/icons/icon_strain_green.png"
              : "/images/icons/icon_strain_unselected.png"
          }
          className="icon20"
        />
      </div>
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
