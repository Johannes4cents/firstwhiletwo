import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { timeToMs } from "../../misc/helperFuncs";
import chatStore from "../../stores/chatStore";
import readStore from "../../stores/readStore";
import { queryCollectionGroup } from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";
import RessourceBlinker from "../../ressources/RessourceBlinker";

const AdminBar = () => {
  const {
    info,
    setInfo,
    changeChips,
    myAnswers,
    savedChats,
    lastUpdated,
    lastRessource,
  } = userStore();

  const { triggerWords, clearRecentlyTyped, resTrigger, alphabetWords } =
    readStore();
  const { displayedMessages, currentMessage, resScore } = chatStore();
  const {
    fireFlags,
    statements,
    myStrains,
    allStrains,
    myMedia,
    userComparissons,
    turfChats,
  } = listsStore();
  const navigate = useNavigate();

  function addChips() {
    changeChips("strains", 100);
  }

  const checkStuff = () => {
    console.log("lastRessource - ", lastRessource);
  };

  const queryTest = () => {
    const twoDays = new Date().getTime() + timeToMs(0, 0, 0, 2);
    console.log("twoDays - ", twoDays);
    queryCollectionGroup("messages", "timestamp.msTime", ">", twoDays).then(
      (docs) => {
        console.log("docs are - ", docs);
      }
    );
  };

  const clearStorage = () => {
    localStorage.clear();
    setInfo(null);
  };

  return (
    <div className="divRow">
      <RessourceBlinker />
      <div>
        <img
          className="icon40"
          style={{
            marginRight: "25px",
            alignSelf: "center",
          }}
          src="/images/drawable/icon_event.png"
          onClick={checkStuff}
        />

        <img
          className="icon40"
          style={{
            marginRight: "25px",
            alignSelf: "center",
          }}
          src="/images/drawable/icon_delete.png"
          onClick={clearStorage}
        />
      </div>
    </div>
  );
};

export default AdminBar;
