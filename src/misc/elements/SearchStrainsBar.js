import React, { useState } from "react";
import { toast } from "react-toastify";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";
import { addItemToUserList, cloudFunc } from "../handleFirestore";
import PickSchoolButton from "./PickSchoolButton";

import SearchBar from "./SearchBar";

const SearchStrainsBar = ({ displayedStrains, setDisplayedStrains }) => {
  const { addMyStrain, suggestedStrains } = listsStore();
  const [pickedSchool, setPickedSchool] = useState();
  const { info, changeChips } = userStore();
  const [strainInput, setStrainInput] = useState("");
  const [resetSearchTrigger, setResetSearchTrigger] = useState(null);

  const onSearchFunc = (result) => {
    setStrainInput(result);
    if (result.length > 0)
      setDisplayedStrains(
        suggestedStrains.filter((s) =>
          s.id.toLowerCase().startsWith(result.toLowerCase())
        )
      );
    else setDisplayedStrains(suggestedStrains);
  };

  const makeNewStrain = () => {
    function afterUpload(data) {
      toast(`Strain "${data.data.strain}" injected into firstwhile`, {
        position: "top-left",
        autoClose: "2000",
      });

      if (data.data.strain) {
        addMyStrain(info.uid, data.data.strain);
        addItemToUserList(info.uid, "myStrains", data.data.strain);
        changeChips("strains", -10);
      }
    }

    function onError(error) {
      toast(error.message, {
        position: "top-left",
        autoClose: "1000",
        pauseOnHover: false,
      });
    }

    if (displayedStrains.length < 1 && strainInput.length > 0) {
      cloudFunc(
        "addNewStrain",
        {
          school: pickedSchool.id,
          strain: strainInput.toLocaleLowerCase(),
        },
        afterUpload,
        onError
      );
    }
  };

  const onInputEnter = (e) => {
    if (e.key == "Enter") {
      if (info.chips.strains >= 10) {
        makeNewStrain();
        setStrainInput("");
      } else toast("Not enough chips to create a new strain");
      setResetSearchTrigger({});
    }
  };

  return (
    <div className="divRow">
      <SearchBar
        noSpace={true}
        maxLength={20}
        onSearchFunc={onSearchFunc}
        onEnter={onInputEnter}
        resetSearchTrigger={resetSearchTrigger}
      />
      {displayedStrains.length < 1 && strainInput.length > 0 ? (
        <PickSchoolButton
          pickedSchool={pickedSchool}
          setPickedSchool={setPickedSchool}
        />
      ) : (
        <div className="divRow" style={{ width: "20px" }} />
      )}
    </div>
  );
};

export default SearchStrainsBar;
