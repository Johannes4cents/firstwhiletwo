import React, { useEffect, useState } from "react";
import userStore from "../stores/userStore";
import { useNavigate } from "react-router";
import listsStore from "../stores/listsStore";
import { dateToTimestamp, objectToArray, timeToMs } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import readStore from "../stores/readStore";
import { queryCollectionGroup } from "../misc/handleFirestore";

const AdminBar = () => {
  const { info, setInfo } = userStore();

  const { triggerWords, clearRecentlyTyped } = readStore();
  const { displayedMessages } = chatStore();
  const { fireFlags, statements, myStrains } = listsStore();
  const navigate = useNavigate();

  const checkStuff = () => {
    console.log("myStrains - ", myStrains);
    console.log("info - ", info);
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
