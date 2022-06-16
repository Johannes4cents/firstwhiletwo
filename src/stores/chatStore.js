import React from "react";
import create from "zustand";

const chatStore = create((set) => ({
  selectedMsgRessources: ["cash"],
  setMsgRessource: (ressource) => {
    set(() => {
      return { selectedMsgRessources: [ressource] };
    });
  },
  AddRemoveSelectedMsgRessource: (ressource) => {
    var newRessources = [];
    set((state) => {
      if (state.selectedMsgRessources.includes(ressource))
        newRessources = state.selectedMsgRessources.filter(
          (r) => r != ressource
        );
      else newRessources = [...state.selectedMsgRessources, ressource];
      return { selectedMsgRessources: newRessources };
    });
  },
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
