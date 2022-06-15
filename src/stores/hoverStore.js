import React from "react";
import create from "zustand";

const hoverStore = create((set) => ({
  box: null,
  setBox: (box) => {
    set(() => {
      return {
        box,
      };
    });
  },
  open: false,
  setOpen: (bool) => {
    set(() => {
      return { open: bool };
    });
  },
  offset: { x: 0, y: 0 },
  setOffset: (offset) => {
    set(() => {
      return { offset };
    });
  },
}));

export default hoverStore;
