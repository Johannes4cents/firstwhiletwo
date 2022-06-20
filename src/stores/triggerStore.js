import { capitalize } from "@mui/material";
import React from "react";
import create from "zustand";

const triggerStore = create((set) => ({
  loginTrigger: {},
  setLoginTrigger: () => {
    set(() => {
      return { loginTrigger: {} };
    });
  },
  lootCollectedTrigger: {},
  triggerLootCollected: () => {
    set(() => {
      return { lootCollectedTrigger: {} };
    });
  },
}));

export default triggerStore;
