import React from "react";
import create from "zustand";

const userStore = create((set) => ({
  info: null,
  loggedIn: false,
  equipped: "fist",
  setInfo: (info) => {
    localStorage.setItem("info", JSON.stringify(info));

    set((state) => {
      return { info: info, loggedIn: info == null ? false : true };
    });
  },
  changeChips: (cat, amount) => {
    set((state) => {
      let newInfo = { ...state.info };
      newInfo.chips[cat] += amount;
      localStorage.setItem("info", JSON.stringify(newInfo));
      return { info: newInfo };
    });
  },
}));

export default userStore;
