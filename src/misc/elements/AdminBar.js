import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { timeToMs } from "../../misc/helperFuncs";
import chatStore from "../../stores/chatStore";
import readStore from "../../stores/readStore";
import { queryCollectionGroup } from "../../misc/handleFirestore";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";

const AdminBar = () => {
  const { info, setInfo, changeChips, myAnswers } = userStore();

  const { triggerWords, clearRecentlyTyped, resTrigger } = readStore();
  const { displayedMessages, currentMessage } = chatStore();
  const { fireFlags, statements, myStrains, suggestedStrains, myMedia } =
    listsStore();
  const navigate = useNavigate();

  function addChips() {
    changeChips("strains", 100);
  }

  const checkStuff = () => {
    console.log("displayedMessages - ", displayedMessages);
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
