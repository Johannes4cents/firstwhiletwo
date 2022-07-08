import React, { useState } from "react";
import { useEffect } from "react";
import { objectToArray } from "../../misc/helperFuncs";
import listsStore from "../../stores/listsStore";
import ChatListHolder from "../holder/ChatListHolder";

const HotChatsPage = () => {
  const [displayedChats, setDisplayedChats] = useState([]);
  const { turfChats, userComparissons } = listsStore();

  useEffect(() => {
    let turfList = objectToArray(turfChats).sort((a, b) =>
      a.value.length > b.value.length ? 1 : -1
    );
    setDisplayedChats(turfList);
  }, [turfChats]);
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        flex: 1,
        maxHeight: "360px",
        overflow: "auto",
      }}
    >
      {displayedChats.map((c) => (
        <ChatListHolder chat={c} key={c.key} comparissons={userComparissons} />
      ))}
    </div>
  );
};

export default HotChatsPage;
