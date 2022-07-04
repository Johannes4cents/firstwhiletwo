import React from "react";
import { toast } from "react-toastify";
import create from "zustand";
import ChatMessage from "../fire_classes/ChatMessage";
import { forArrayLength } from "../misc/helperFuncs";

const chatStore = create((set) => ({
  setMsgRessources: (ressource) => {
    set((state) => {
      return {
        currentMessage: { ...state.currentMessage, ressources: [ressource] },
      };
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
  updateDisplayedMessage: (message) => {
    set((state) => {
      let index = state.displayedMessages.map((m) => m.id).indexOf(message.id);
      let newList = [...state.displayedMessages];
      newList[index] = message;
      return { displayedMessages: newList };
    });
  },
  resetDisplayedMessages: () => {
    set(() => {
      return { displayedMessages: [] };
    });
  },
  currentMessage: ChatMessage(),
  changeCurrentMessage: (message) => {
    set((state) => {
      return { currentMessage: { ...message } };
    });
  },
  resetCurrentMessage: () => {
    set((state) => {
      return { currentMessage: ChatMessage() };
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
  addAttachedItem: (info, item) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedItems: [...state.currentMessage.attachedItems, item],
        },
      };
    });
  },
  removeAttachedItem: (item) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedItems: state.currentMessage.attachedItems.filter(
            (i) => i != item
          ),
        },
      };
    });
  },
  setMessageContent: (content) => {
    set((state) => {
      let newMessage = { ...state.currentMessage, msg: content };
      return { currentMessage: newMessage };
    });
  },
  addAttachedImages: (images) => {
    set((state) => {
      let newImageArray = [...state.currentMessage.attachedImages];
      forArrayLength(images, (image) => {
        if (newImageArray.length < 4) newImageArray.push(image);
        else toast("Only a maximum of 4 images per message");
      });
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedImages: newImageArray,
        },
      };
    });
  },
  removeAttachedImage: (image) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedImages: state.currentMessage.attachedImages.filter(
            (i) => i != image
          ),
        },
      };
    });
  },
}));

export default chatStore;
