import React from "react";
import create from "zustand";

const chatStore = create((set) => ({
  activeChats: [],
  setActiveChats: (chats) => {
    set((state) => {
      return { activeChats: chats };
    });
  },
  displayedMessages: [],
  setDisplayedMessages: (messages) => {
    set(() => {
      return { displayedMessages: messages };
    });
  },
}));

export default chatStore;
