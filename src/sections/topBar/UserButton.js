import React, { useState, useRef, useEffect } from "react";
import FlagPickerModal from "../../modals/FlagPickerModal";
import OptionsModal from "../../modals/OptionsModal";
import userStore from "../../stores/userStore";

const UserButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const { info } = userStore();
  const flagImage = useRef();
  const [nickName, setNickName] = useState("Not signed in");

  const onFlagClicked = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setModalOpen(true);
  };

  const onOptionsClicked = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setOptionsOpen(true);
  };

  useEffect(() => {
    if (info != null) {
      // set displayed name
      setNickName(info.nickname);
      // set localization
      switch (info.language) {
        case "german":
          flagImage.current.setAttribute(
            "src",
            "/images/flags/flag_german.png"
          );
          break;
        case "english":
          flagImage.current.setAttribute("src", "/images/flags/flag_us.png");
          break;
      }
    } else {
      setNickName("Not signed in");
    }
  }, [info]);

  return (
    <div className="divRowSpaceAround" style={{ alignItems: "center" }}>
      <div className="userButton" onClick={onOptionsClicked}>
        <div className="textBoldWhite">{nickName}</div>
      </div>
      <img
        onClick={onFlagClicked}
        className="icon40"
        src={"/images/flags/flag_german.png"}
        style={{ marginLeft: "5px" }}
        ref={flagImage}
      />
      {modalOpen && (
        <FlagPickerModal
          mousePosition={mousePosition}
          setModalOpen={setModalOpen}
        />
      )}
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
