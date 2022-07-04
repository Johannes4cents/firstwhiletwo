import React from "react";
import create from "zustand";

const userStore = create((set) => ({
  info: null,
  loggedIn: false,
  equipped: "fist",
  myStatements: [],
  addStatement: (uid, statement) => {
    set((state) => {
      let newStatements = [
        ...state.myStatements.filter(
          (s) => !statement.competitors.includes(s.id)
        ),
        statement,
      ];
      localStorage.setItem(uid + "myStatements", JSON.stringify(newStatements));
      return { myStatements: newStatements };
    });
  },
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

  changeRessources: (ressource, amount) => {
    set((state) => {
      let newRessources = { ...state.info.ressources };
      newRessources[ressource].amount += amount;
      let newInfo = { ...state.info, ressources: newRessources };
      return { info: newInfo };
    });
  },
}));

export default userStore;
