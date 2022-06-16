import React from "react";
import create from "zustand";

const chatStore = create((set) => ({
  activeChat: [],
  setActiveChat: (chats) => {
    set((state) => {
      return { activeChat: chats };
    });
  },
  activeChats: [],
  setActiveChats: (chats) => {
    set(() => {
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
