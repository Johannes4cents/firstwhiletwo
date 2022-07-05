import React from "react";
import { toast } from "react-toastify";
import create from "zustand";
import ChatMessage from "../fire_classes/ChatMessage";
import { forArrayLength } from "../misc/helperFuncs";

const chatStore = create((set) => ({
  lastMsgRessources: ["cash"],
  setMsgRessources: (ressource) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          ressources: [ressource],
        },
        lastMsgRessources: [ressource],
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
      console.log("state.lastMsgRessources - ", state.lastMsgRessources);
      return { currentMessage: ChatMessage(state.lastMsgRessources) };
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
  addAttachedMedia: (images, type) => {
    set((state) => {
      let newMediaArray = [...state.currentMessage.attachedMedia];
      let typedMedia = images.map((i) => {
        return { file: i, type, favorite: false };
      });
      forArrayLength(typedMedia, (media) => {
        if (newMediaArray.length < 4) {
          newMediaArray.push(media);
        } else toast("Only a maximum of 4 images per message");
      });

      return {
        currentMessage: {
          ...state.currentMessage,
          attachedMedia: newMediaArray,
        },
      };
    });
  },
  addMediaUrlToMsg: (path) => {
    set((state) => {
      if (![...(state.currentMessage.imgUrls ?? [])].includes(path))
        return {
          currentMessage: {
            ...state.currentMessage,
            imgUrls: [...(state.currentMessage.imgUrls ?? []), path],
          },
        };
    });
  },
  removeAttachedImage: (image) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedMedia: state.currentMessage.attachedMedia.filter(
            (i) => i != image
          ),
        },
      };
    });
  },
}));

export default chatStore;
