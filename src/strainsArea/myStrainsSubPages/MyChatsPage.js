import React from "react";
import listsStore from "../../stores/listsStore";
import userStore from "../../stores/userStore";
import ChatListHolder from "../holder/ChatListHolder";

const MyChatsPage = () => {
  const { savedChats } = userStore();
  const { userComparissons } = listsStore();
  return (
    <div
      className="divColumn"
      style={{
        width: "100%",
        maxHeight: "360px",
        overflow: "auto",
        height: "100%",
        flex: 1,
      }}
    >
      {savedChats.map((c) => (
        <ChatListHolder
          chat={c}
          key={c.id}
          comparissons={userComparissons}
          from={"myChats"}
        />
      ))}
    </div>
  );
};

export default MyChatsPage;
