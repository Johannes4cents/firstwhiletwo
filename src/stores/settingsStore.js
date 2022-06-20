import { capitalize } from "@mui/material";
import React from "react";
import create from "zustand";

const settingsStore = create((set) => ({
  showAllies: false,
  showAlike: false,
  showFoes: false,
  showCelebs: false,
  switchShowPeople: (uid, people) => {
    set((state) => {
      const peopleFilter = {
        showAllies: people == "allies" ? !state.showAllies : state.showAllies,
        showAlike: people == "alike" ? !state.showAlike : state.showAlike,
        showFoes: people == "foes" ? !state.showFoes : state.showFoes,
        showCelebs: people == "celebs" ? !state.showCelebs : state.showAllies,
      };
      localStorage.setItem(uid + "showPeople", JSON.stringify(peopleFilter));
      return {
        [`show${capitalize(people)}`]: !state[`show${capitalize(people)}`],
      };
    });
  },
  setShowPeople: (peopleFilter) => {
    set(() => {
      return {
        showAlike: peopleFilter.showAlike,
        showAllies: peopleFilter.showAllies,
        showFoes: peopleFilter.showFoes,
        showCelebs: peopleFilter.showCelebs,
      };
    });
  },
  minMaxMsgUpvotes: [0, 100],
  setMinMaxUpvotes: (uid, valueArray) => {
    set(() => {
      localStorage.setItem(
        uid + "minMaxMsgUpvotes",
        JSON.stringify(valueArray)
      );
      return { minMaxMsgUpvotes: valueArray };
    });
  },
}));

export default settingsStore;
