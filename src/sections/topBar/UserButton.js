import React, { useState, useRef, useEffect } from "react";
import FlagPickerModal from "../../modals/FlagPickerModal";
import OptionsModal from "../../modals/OptionsModal";
import userStore from "../../stores/userStore";
import ProfilePictureImage from "./ProfilePictureImage";

const UserButton = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const { info } = userStore();
  const [nickName, setNickName] = useState("Not signed in");

  const onOptionsClicked = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setOptionsOpen(true);
  };

  useEffect(() => {
    if (info != null) {
      // set displayed name
      setNickName(info.nickname);
    } else {
      setNickName("Not signed in");
    }
  }, [info]);

  return (
    <div className="divRowSpaceAround" style={{ alignItems: "center" }}>
      <div className="userButton" onClick={onOptionsClicked}>
        <div className="textBoldWhite">{nickName}</div>
      </div>
      <ProfilePictureImage />
      {optionsOpen && (
        <OptionsModal
          setModalOpen={setOptionsOpen}
          mousePosition={mousePosition}
        />
      )}
    </div>
  );
};

export default UserButton;
