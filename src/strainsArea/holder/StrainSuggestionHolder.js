import React, { useState } from "react";
import bgImg from "../../images/bg_strain.png";
import {
  deleteDocInFirestore,
  deleteItemInUserList,
  setDocInFirestore,
} from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const StrainSuggestionHolder = ({ strain }) => {
  const [deleteHover, setDeleteHover] = useState(false);
  const { info } = userStore();
  const {
    addRemoveActiveStrain,
    addRemoveDismissedStrain,
    activeStrains,
    myStrains,
    addRemoveMyStrain,
  } = listsStore();

  const onClick = () => {
    if (myStrains.map((s) => s.id).includes(strain.id))
      addRemoveActiveStrain(info.uid, strain);
    else {
      setDocInFirestore("users/" + info.uid + "/myStrains", strain.id, strain);
      addRemoveMyStrain(info.uid, strain);
    }
  };

  const removeSuggestion = (strain) => {
    deleteItemInUserList(info.uid, "dismissedStrains", "id", strain.id, false);
    addRemoveDismissedStrain(info.uid, strain);
  };
  return (
    <div
      onClick={onClick}
      className="divRow"
      style={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "29px",
        height: "29px",
        width: "100%",
      }}
    >
      <img
        src={
          deleteHover
            ? "/images/drawable/icon_trashcan.png"
            : "/images/drawable/icon_trashcan_unselected.png"
        }
        onClick={removeSuggestion}
        className="icon15"
        style={{ marginLeft: "5px" }}
        onMouseEnter={() => {
          setDeleteHover(true);
        }}
        onMouseLeave={() => {
          setDeleteHover(false);
        }}
      />
      <div
        className="textWhite"
        style={{
          textAlign: "center",
          flex: 1,
        }}
      >
        {strain.text}
      </div>
      <img
        style={{ marginRight: "5px" }}
        src={
          activeStrains.map((s) => s.id).includes(strain.id)
            ? "/images/icons/icon_strain_green.png"
            : myStrains.map((s) => s.id).includes(strain.id)
            ? "/images/icons/icon_strain_white.png"
            : "/images/icons/icon_strain_unselected.png"
        }
        className="icon20"
      />
    </div>
  );
};

export default StrainSuggestionHolder;
