import React, { useState } from "react";
import useOnHover from "../../hooks/useOnHover";
import bgImg from "../../images/bg_strain.png";
import { deleteItemInUserList } from "../../misc/handleFirestore";
import chatStore from "../../stores/chatStore";
import listsStore from "../../stores/listsStore";
import readStore from "../../stores/readStore";
import userStore from "../../stores/userStore";
import { toast } from "react-toastify";

const StrainListHolder = ({ strain }) => {
  const [deleteHover, setDeleteHover] = useState(false);
  const { info } = userStore();
  const { myStrains } = listsStore();
  const { addRemoveActiveStrain, removeMyStrain, activeStrains } = listsStore();
  const { resetDisplayedMessages } = chatStore();
  const { resetScanArraysIndex, resetScanArrays, setScanningArrays } =
    readStore();
  const hover = useOnHover({
    item: strain,
    inclusionList: activeStrains,
    identifier: "id",
    imageSelected: "/images/icons/icon_strain_green.png",
    imageUnselected: "/images/icons/icon_strain_white.png",
  });
  const onClick = () => {
    resetScanArrays(info.uid);
    resetScanArraysIndex(info.uid);
    setScanningArrays(false);
    resetDisplayedMessages(info.uid);
    addRemoveActiveStrain(info.uid, strain);
  };

  const removeStrain = () => {
    deleteItemInUserList(info.uid, "myStrains", "id", strain.id);
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
        {strain.id}
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
