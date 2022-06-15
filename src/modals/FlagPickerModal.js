import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firebase/fireInit";
import userStore from "../stores/userStore";

const FlagPickerModal = ({ mousePosition, setModalOpen }) => {
  const { info, setInfo } = userStore();

  const onFlagClicked = (language) => {
    let newInfo = { ...info, language: language };
    // update in Firestore
    const docRef = doc(db, "users/", info.uid);
    updateDoc(docRef, { info: newInfo });
    // update in localStorage
    localStorage.setItem("info", JSON.stringify(newInfo));
    // setState
    setInfo(newInfo);
  };

  return (
    <div>
      <div className="overlayClear" onClick={() => setModalOpen(false)} />
      <div
        className="flagsContainer"
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      >
        <img
          onClick={() => {
            onFlagClicked("german");
          }}
          src="/images/flags/flag_german.png"
          className="icon50"
          style={{ margin: "2px" }}
        />
        <img
          src="/images/flags/flag_us.png"
          onClick={() => {
            onFlagClicked("english");
          }}
          className="icon50"
          style={{ margin: "2px" }}
        />
      </div>
    </div>
  );
};

export default FlagPickerModal;
