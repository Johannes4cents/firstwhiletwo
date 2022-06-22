import React from "react";
import create from "zustand";

const userStore = create((set) => ({
  info: null,
  loggedIn: false,
  equipped: "fist",
  setInfo: (info) => {
    localStorage.setItem("info", JSON.stringify(info));
    set((state) => {
      if (info != null) if (info.uid == "6eJVKujMhkp6M1") info.admin = true;
      return { info: info, loggedIn: info == null ? false : true };
    });
  },
}));

export default userStore;
