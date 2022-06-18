import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import SingleInputModal from "./SingleInputModal";
import { toast } from "react-toastify";
import userStore from "../stores/userStore";
import {
  getSingleDocFromFirestore,
  updateDocInFirestore,
} from "../misc/handleFirestore";
import { makeMousePositionObj } from "../misc/helperFuncs";
import FlagPickerModal from "./FlagPickerModal";

const OptionsModal = ({ mousePosition, setModalOpen }) => {
  const auth = getAuth();
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const { setInfo, info } = userStore();
  const [nameMousePosition, setNameMousePosition] = useState({});

  const flagObj = {
    english: "/images/flags/flag_us.png",
    german: "/images/flags/flag_german.png",
  };

  const signOutUser = () => {
    const newInfo = { ...info, loggedIn: false };
    signOut(auth).then(() => {
      // set localStorage
      localStorage.setItem("info", JSON.stringify(newInfo));

      // setState
      setInfo(newInfo);
    });
  };

  const onChangeNicknameClicked = (e) => {
    setNameMousePosition({ x: e.clientX, y: e.clientY });
    setNameModalOpen(true);
  };

  const onChangeLanguage = (e) => {
    setNameMousePosition(makeMousePositionObj(e));
    setFlagModalOpen(true);
  };

  const checkIfNameAlreadyExists = (data, nameString) => {
    if (!data["usernames"].includes(nameString.toLowerCase())) {
      // create newInfo object
      let newInfo = { ...info, nickname: nameString };
      // update info in firestore
      updateDocInFirestore("users/", info.uid, "nickname", nameString);
      // update info in localStorage
      setInfo(newInfo);
      // close nameModal
      setNameModalOpen(false);
      // make Toast
      toast(`Username changed to ${nameString}`);
      // update globalUsernames
      let newList = [...data["usernames"], nameString.toLowerCase()];
      updateDocInFirestore("general", "lists", "usernames", newList);
    } else toast("Name already taken");
  };

  const onNameEntered = (string) => {
    if (string.length > 3 && string.length < 20) {
      getSingleDocFromFirestore(
        "general",
        "lists",
        checkIfNameAlreadyExists,
        string
      );
    } else {
      toast("Name needs to be between 4 & 20 Characters long");
    }
  };
  return (
    <div>
      <div className="overlay" onClick={() => setModalOpen(false)} />
      <div
        className="modalContent"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      >
        <OptionsHolder
          text={"change Nickname"}
          onClick={onChangeNicknameClicked}
        />
        <OptionsHolder
          text={"Language"}
          onClick={onChangeLanguage}
          image={flagObj[info.language]}
        />
        <div
          className="optionButton"
          style={{ marginTop: "5px", marginBottom: "2px" }}
        >
          {info && (
            <div className="textBlueSmallCenter" onClick={() => signOutUser()}>
              Log out
            </div>
          )}
        </div>
      </div>
      {nameModalOpen && (
        <SingleInputModal
          mousePosition={nameMousePosition}
          setModalOpen={setNameModalOpen}
          onSave={onNameEntered}
          title="Enter New Pen Name"
        />
      )}
      {flagModalOpen && (
        <FlagPickerModal
          mousePosition={nameMousePosition}
          setModalOpen={setFlagModalOpen}
        />
      )}
    </div>
  );
};

function OptionsHolder({ text, onClick, image = null }) {
  return (
    <div className="optionButton" onClick={onClick}>
      <div className="textBoldWhiteCenter" style={{ marginTop: "2px" }}>
        {text}
      </div>
      {image && <img src={image} className="icon20" />}
    </div>
  );
}

export default OptionsModal;
