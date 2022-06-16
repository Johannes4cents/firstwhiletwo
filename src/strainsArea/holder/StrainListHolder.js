import React, { useState } from "react";
import useOnHover from "../../hooks/useOnHover";
import bgImg from "../../images/bg_strain.png";
import { deleteDocInFirestore } from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const StrainListHolder = ({ strain }) => {
  const [deleteHover, setDeleteHover] = useState(false);
  const { info } = userStore();

  const { addRemoveActiveStrain, removeMyStrain, activeStrains } = listsStore();
  const hover = useOnHover({
    item: strain,
    inclusionList: activeStrains,
    identifier: "id",
    imageSelected: "/images/icons/icon_strain_green.png",
    imageUnselected: "/images/icons/icon_strain_white.png",
  });
  const onClick = () => {
    addRemoveActiveStrain(info.uid, strain);
  };

  const removeStrain = () => {
    deleteDocInFirestore("users/" + info.uid + "/myStrains", strain.id);
    removeMyStrain(info.uid, strain);
  };
  return (
    <div
      {...hover.divProps}
      className="divRow"
      style={{
        backgroundImage: `url(${bgImg})`,
        maxHeight: "29px",
        height: "29px",
        width: "100%",
        minHeight: "29px",
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
          color: hover.textColor,
        }}
      >
        {strain.text}
      </div>
      <img
        onClick={onClick}
        style={{ marginRight: "5px" }}
        src={hover.activeImage}
        className="icon20"
      />
    </div>
  );
};

export default StrainListHolder;
