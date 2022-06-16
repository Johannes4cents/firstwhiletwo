import React, { useState } from "react";
import { makeStrain } from "../../fire_classes/Strain";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";
import SearchBar from "./SearchBar";

const SearchStrainsBar = ({ displayedStrains, setDisplayedStrains }) => {
  const { addMyStrain, strainWords, addRemoveStrainWord } = listsStore();
  const { info } = userStore();
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

  return (
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
  );
};

export default SearchStrainsBar;
