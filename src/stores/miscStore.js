import React from "react";
import create from "zustand";

const miscStore = create((set) => ({
  inputHeight: 0,
  setInputHeight: (height) => {
    set(() => {
      return { inputHeight: height };
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
  lastUpdates: { info: {}, votes: {} },
  setLastUpdates: (lastUpdates) => {
    localStorage.setItem("lastUpdates", JSON.stringify(lastUpdates));
    set(() => {
      return { lastUpdates };
    });
  },
}));

export default miscStore;
