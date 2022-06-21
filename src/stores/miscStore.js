import React from "react";
import create from "zustand";
import { dateToTimestamp } from "../misc/helperFuncs";

const miscStore = create((set) => ({
  inputHeight: 0,
  setInputHeight: (height) => {
    set(() => {
      return { inputHeight: height };
    });
  },
  attachedItemHeight: 0,
  setAttachedItemHeight: (height) => {
    set(() => {
      return { attachedItemHeight: height };
    });
  },
  modalOpen: false,
  closeModal: () => {
    set(() => {
      return { modalOpen: false };
    });
  },
  openModal: () => {
    set(() => {
      return { modalOpen: true };
    });
  },
  contextContent: null,
  setContextContent: (menu) => {
    set((state) => {
      return { contextMenu: menu };
    });
  },
  dragCursor: null,
  setDragCursor: (cursor) => {
    set((state) => {
      return { dragCursor: cursor };
    });
  },
  lastUpdates: { info: null, votes: null, fireFlags: null },
  setLastUpdates: (lastUpdates) => {
    localStorage.setItem("lastUpdates", JSON.stringify(lastUpdates));
    set(() => {
      return { lastUpdates };
    });
  },
  lastActive: null,
  updateLastActive: () => {
    set(() => {
      return { lastActive: dateToTimestamp(new Date()) };
    });
  },
}));

export default miscStore;
