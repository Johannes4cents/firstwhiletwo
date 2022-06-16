import { capitalize } from "@mui/material";
import React from "react";
import create from "zustand";

const settingsStore = create((set) => ({
  showAllies: false,
  showAlike: false,
  showFoes: false,
  showCelebs: false,
  switchShowPeople: (people) => {
    set((state) => {
      return {
        [`show${capitalize(people)}`]: !state[`show${capitalize(people)}`],
      };
    });
  },
  minMaxMsgUpvotes: [0, 100],
  setMinMaxUpvotes: (valueArray) => {
    set(() => {
      return { minMaxMsgUpvotes: valueArray };
    });
  },
}));

export default settingsStore;
