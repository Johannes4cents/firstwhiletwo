import React from "react";
import { toast } from "react-toastify";
import create from "zustand";
import ChatMessage from "../fire_classes/ChatMessage";
import { forArrayLength } from "../misc/helperFuncs";
import { ressources } from "../misc/lists/otherLists";

const chatStore = create((set) => ({
  resScore: {},
  setupResScore: () => {
    let resObj = {};
    forArrayLength(ressources, (res) => {
      resObj[res] = 0;
    });
    set((state) => {
      return { resScore: resObj };
    });
  },
  setResScore: (score) => {
    set((state) => {
      return { resScore: score };
    });
  },
  lastMsgRessources: ["love"],
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
  setActiveChat: (chat) => {
    set((state) => {
      return { activeChat: chat };
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
      return {
        displayedMessages: dms
          .concat(newMessages)
          .sort((a, b) => (a.msTime > b.msTime ? 1 : -1)),
      };
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
  setMessageContent: (content, fromShiftEnter) => {
    if (content == "\n" && !fromShiftEnter) return;
    set((state) => {
      let newMessage = { ...state.currentMessage, msg: content };
      return { currentMessage: newMessage };
    });
  },
  attachDroppedMeddia: (images, type) => {
    set((state) => {
      let newMediaArray = [...state.currentMessage.attachedMedia];
      let typedMedia = images.map((i) => {
        return { file: i, type, favorite: false, firstDrop: true };
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
  addMyMediaToMsg: (media) => {
    media.firstDrop = false;
    set((state) => {
      if (state.currentMessage.attachedMedia.length < 4) {
        return {
          currentMessage: {
            ...state.currentMessage,
            attachedMedia: [...state.currentMessage.attachedMedia, media],
          },
        };
      }
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
  removeAttachedMedia: (media) => {
    set((state) => {
      return {
        currentMessage: {
          ...state.currentMessage,
          attachedMedia: state.currentMessage.attachedMedia.filter(
            (m) => m.id != media.id
          ),
        },
      };
    });
  },
}));

export default chatStore;
