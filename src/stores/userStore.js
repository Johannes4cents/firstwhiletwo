import React from "react";
import create from "zustand";

const userStore = create((set) => ({
  info: null,
  loggedIn: false,
  setInfo: (info) => {
    localStorage.setItem("info", JSON.stringify(info));
    set((state) => {
      return { info: info, loggedIn: info == null ? false : true };
    });
  },
}));

export default userStore;
