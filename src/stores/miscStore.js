import React from "react";
import create from "zustand";

const miscStore = create((set) => ({
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
}));

export default miscStore;
