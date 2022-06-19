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
    set((state) => {
      const dms = [...state.displayedMessages];
      const newMessages = messages.filter(
        (msg) => !state.displayedMessages.map((m) => m.id).includes(msg.id)
      );
      return { displayedMessages: dms.concat(newMessages) };
    });
  },
  resetDisplayedMessages: () => {
    set(() => {
      return { displayedMessages: [] };
    });
  },
  addItemToMessage: (item, msgId) => {
    set((state) => {
      let newMessages = [...state.displayedMessages];
      let msg = newMessages.find((m) => m.id == msgId);
      msg.spawnedItems.push(item);
      return { displayedMessages: newMessages };
    });
  },
}));

export default chatStore;
