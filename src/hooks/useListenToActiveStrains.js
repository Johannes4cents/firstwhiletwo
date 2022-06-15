import { collection, getDocs } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import listsStore from "../stores/listsStore";
import db from "../firebase/fireInit";
import {
  checkIfTurfChatExists,
  getChatList,
  getChatListener,
} from "../chat/handleChat";
import userStore from "../stores/userStore";
import chatStore from "../stores/chatStore";
const useListenToActiveStrains = (subscriptions, setSubscriptions) => {
  const { activeStrains } = listsStore();
  const { setActiveChats, setDisplayedMessages } = chatStore();

  const { info } = userStore();

  function listenToStrainChats() {
    for (let i = 0; i < subscriptions.length; i++) {
      const unsubscribe = subscriptions[i];
      unsubscribe();
    }
    const strains = activeStrains
      .map((s) => s.text)
      .sort((a, b) => (a > b ? 1 : -1));

    const turfChat = strains.join("|").toLowerCase();
    const chatList = getChatList(strains);
    for (let i = 0; i < chatList.length; i++) {
      const chat = chatList[i];
      checkIfTurfChatExists(chat, info.uid, info.nickname);
    }
    setActiveChats(chatList);
    const unsubscribe = getChatListener(turfChat, (messages) => {
      setDisplayedMessages(messages);
    });
    setSubscriptions([...subscriptions, unsubscribe]);
    return unsubscribe;
  }

  return listenToStrainChats;
};

export default useListenToActiveStrains;
