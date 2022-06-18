import React, { useEffect, useState } from "react";
import userStore from "../stores/userStore";
import { useNavigate } from "react-router";
import listsStore from "../stores/listsStore";
import { dateToTimestamp, objectToArray } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import readStore from "../stores/readStore";

const AdminBar = () => {
  const { info, setInfo, loggedIn } = userStore();
  const { activeStrains, myStrains } = listsStore();
  const {
    clearRecentlyTyped,
    scanArrays,
    scanArraysIndex,
    scanningArrays,
    resTrigger,
    triggerWords,
  } = readStore();
  const { activeChat } = chatStore();
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const checkStuff = () => {
    clearRecentlyTyped();
    console.log("scanArrays are - ", scanArrays);
    const resTriggerArray = objectToArray(resTrigger);
    console.log("resTrigger is - ", resTriggerArray);
  };

  const clearStorage = () => {
    localStorage.clear();
    setInfo(null);
  };

  useEffect(() => {
    if (info != null) {
      if (info.admin) setIsAdmin(true);
      else setIsAdmin(false);
    } else setIsAdmin(false);
  }, [info]);

  return (
    <div className="divRow">
      {isAdmin && (
        <div>
          <img
            className="icon40"
            style={{
              marginRight: "25px",
              alignSelf: "center",
            }}
            src="/images/icons/icon_loot.png"
            onClick={(e) => navigate("create_fire_items")}
          />
          <img
            className="icon40"
            style={{
              marginRight: "25px",
              alignSelf: "center",
            }}
            src="/images/pageFlags/icon_flag.png"
            onClick={(e) => navigate("create_flags")}
          />
          <img
            className="icon40"
            style={{
              marginRight: "25px",
              alignSelf: "center",
            }}
            src="/images/drawable/event_shield.png"
            onClick={(e) => navigate("admin")}
          />
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
      )}
    </div>
  );
};

export default AdminBar;
