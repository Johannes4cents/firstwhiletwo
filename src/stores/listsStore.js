import React from "react";
import create from "zustand";

const listsStore = create((set) => ({
  loot: [],
  setLoot: (loot) => {
    set(() => {
      return { loot };
    });
  },
  dismissedStrains: [],
  setDismissedStrains: (strains) => {
    set(() => {
      return { dismissedStrains: strains };
    });
  },
  addRemoveDismissedStrain: (uid, strain) => {
    set((state) => {
      var newList = [];
      if (state.dismissedStrains.map((s) => s.id).includes(strain.id))
        newList = state.dismissedStrains.filter((s) => s.id != strain.id);
      else newList = [...state.dismissedStrains, strain];
      localStorage.setItem(uid + "dismissedStrains", JSON.stringify(newList));
      return { dismissedStrains: newList };
    });
  },
  strainWords: [],
  setStrainWords: (list) => {
    set((state) => {
      return { strainWords: list };
    });
  },
  addRemoveStrainWord: (uid, strain) => {
    set((state) => {
      var list = [];
      if (!state.strainWords.map((s) => s.id).includes(strain.id))
        list = [...state.strainWords, strain];
      else list = state.strainWords.filter((s) => s.id != strain.id);
      localStorage.setItem(uid + "strainWords", JSON.stringify(list));
      return {
        strainWords: list.sort((a, b) => (a.text > b.text ? 1 : -1)),
      };
    });
  },
  statementFlags: [],
  setStatementFlags: (uid, flags) => {
    localStorage.setItem(uid + "statementFlags", JSON.stringify(flags));
    set((state) => {
      return { flags };
    });
  },
  flags: [],
  setFlags: (uid, flags) => {
    localStorage.setItem(uid + "flags", JSON.stringify(flags));
    set((state) => {
      return { flags };
    });
  },
  suggestedStrains: [],
  setSuggestedStrains: (uid, strains) => {
    localStorage.setItem(uid + "suggestedStrains", JSON.stringify(strains));
    set((state) => {
      return { suggestedStrains: strains };
    });
  },

  myStrains: [],
  setMyStrains: (uid, strains) => {
    if (strains != undefined && strains != null) {
      localStorage.setItem(uid + "myStrains", JSON.stringify(strains));
    }

    set((state) => {
      return {
        myStrains: strains,
        activeStrains: strains.filter((s) => s.selected),
      };
    });
  },
  addMyStrain: (uid, strain) => {
    set((state) => {
      const newList = [...state.myStrains, strain];
      localStorage.setItem(uid + "myStrains", JSON.stringify(newList));
      return { myStrains: newList };
    });
  },
  removeMyStrain: (uid, strain) => {
    set((state) => {
      let newList = state.myStrains.filter((s) => s.id != strain.id);
      let newActiveList = state.activeStrains.filter((s) => s.id != strain.id);
      localStorage.setItem(uid + "myStrains", JSON.stringify(newList));
      localStorage.setItem(
        uid + "activeStrains",
        JSON.stringify(newActiveList)
      );
      return {
        myStrains: newList,
        activeStrains: newActiveList,
      };
    });
  },
  addRemoveMyStrain: (uid, strain) => {
    set((state) => {
      var list = [];
      if (!state.myStrains.map((s) => s.id).includes(strain.id))
        list = [...state.myStrains, strain];
      else list = state.mytrains.filter((s) => s.id != strain.id);
      localStorage.setItem(uid + "myStrains", JSON.stringify(list));
      return {
        myStrains: list.sort((a, b) => (a.text > b.text ? 1 : -1)),
      };
    });
  },

  activeStrains: [],
  setActiveStrains: (strains) => {
    set((state) => {
      return { activeStrains: strains };
    });
  },
  addRemoveActiveStrain: (uid, strain) => {
    set((state) => {
      var list = [];
      if (!state.activeStrains.map((s) => s.id).includes(strain.id)) {
        if (state.activeStrains.length > 2) state.activeStrains.pop();
        list = [...state.activeStrains, strain];
      } else list = state.activeStrains.filter((s) => s.id != strain.id);
      localStorage.setItem(uid + "activeStrains", JSON.stringify(list));
      return {
        activeStrains: list.sort((a, b) => (a.text > b.text ? 1 : -1)),
      };
    });
  },
}));

export default listsStore;
