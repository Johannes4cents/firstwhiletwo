import React, { useState } from "react";
import bgImg from "../../images/bg_strain.png";
import { deleteDocInFirestore } from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const StrainListHolder = ({ strain }) => {
  const [deleteHover, setDeleteHover] = useState(false);
  const { info } = userStore();
  const { addRemoveActiveStrain, removeMyStrain, activeStrains } = listsStore();
  const onClick = () => {
    addRemoveActiveStrain(info.uid, strain);
  };

  const removeStrain = () => {
    deleteDocInFirestore("users/" + info.uid + "/myStrains", strain.id);
    removeMyStrain(info.uid, strain);
  };
  return (
    <div
      className="divRow"
      style={{
        backgroundImage: `url(${bgImg})`,
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
        onClick={removeStrain}
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
        onClick={onClick}
        style={{
          textAlign: "center",
          flex: 1,
          color: strain.selected ? "red" : "white",
        }}
      >
        {strain.text}
      </div>
      <img
        onClick={onClick}
        style={{ marginRight: "5px" }}
        src={
          activeStrains.map((s) => s.id).includes(strain.id)
            ? "/images/icons/icon_strain.png"
            : "/images/icons/icon_strain_unselected.png"
        }
        className="icon20"
      />
    </div>
  );
};

export default StrainListHolder;
