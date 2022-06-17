import React from "react";
import create from "zustand";
import {
  dateToTimestamp,
  forArrayLength,
  umlautFix,
} from "../misc/helperFuncs";
import resTriggerWords from "../misc/lists/resTriggerWords";

const resetResTrigger = {
  mana: [],
  oil: [],
  food: [],
  knowledge: [],
  rage: [],
  happiness: [],
  weapons: [],
  energy: [],
  diplomacy: [],
  fear: [],
  science: [],
  health: [],
  love: [],
  cash: [],
};

const readStore = create((set) => ({
  resTrigger: { ...resetResTrigger },
  setResTrigger: (resTrigger) => {
    set(() => {
      return { resTrigger };
    });
  },
  scanningArrays: false,
  setScannedMessages: (bool) => {
    set(() => {
      return { scanningArrays: bool };
    });
  },
  scanIndex: 0,
  increaseScanIndex: () => {
    set((state) => {
      return { scanIndex: state.scanIndex + 1 };
    });
  },
  scanArrays: [],
  setScanArrays: (uid, list) => {
    set(() => {
      localStorage.setItem(uid + "scanArrays", JSON.stringify(list));
      return { scanArrays: list };
    });
  },
  resetScanArray: (uid) => {
    localStorage.setItem(uid + "scanArrays", JSON.stringify([]));
    return { scanArrays: [] };
  },
  addScanArrays: (uid, arrays) => {
    set((state) => {
      let newList = [...state.scanArrays, ...arrays];
      localStorage.setItem(uid + "scanArrays", JSON.stringify(newList));
      return { scanArrays: newList };
    });
  },
  scannedMessages: [],
  setScannedMessages: (uid, messages) => {
    localStorage.setItem(uid + "scannedMessages", JSON.stringify(messages));
    set(() => {
      return { scannedMessages: messages };
    });
  },
  addScannedMessages: (uid, messages) => {
    set((state) => {
      let newList = [
        ...state.scannedMessages,
        ...messages.map((m) => {
          return { message: m, timestamp: dateToTimestamp(new Date()) };
        }),
      ];
      localStorage.setItem(uid + "scannedMessages", JSON.stringify(newList));
      return { scannedMessages: newList };
    });
  },

  triggerWords: {
    a: { loot: [], profile: [], bags: [] },
    b: { loot: [], profile: [], bags: [] },
    c: { loot: [], profile: [], bags: [] },
    d: { loot: [], profile: [], bags: [] },
    e: { loot: [], profile: [], bags: [] },
    f: { loot: [], profile: [], bags: [] },
    g: { loot: [], profile: [], bags: [] },
    h: { loot: [], profile: [], bags: [] },
    i: { loot: [], profile: [], bags: [] },
    j: { loot: [], profile: [], bags: [] },
    k: { loot: [], profile: [], bags: [] },
    l: { loot: [], profile: [], bags: [] },
    m: { loot: [], profile: [], bags: [] },
    n: { loot: [], profile: [], bags: [] },
    o: { loot: [], profile: [], bags: [] },
    p: { loot: [], profile: [], bags: [] },
    q: { loot: [], profile: [], bags: [] },
    r: { loot: [], profile: [], bags: [] },
    s: { loot: [], profile: [], bags: [] },
    t: { loot: [], profile: [], bags: [] },
    u: { loot: [], profile: [], bags: [] },
    v: { loot: [], profile: [], bags: [] },
    w: { loot: [], profile: [], bags: [] },
    x: { loot: [], profile: [], bags: [] },
    y: { loot: [], profile: [], bags: [] },
    z: { loot: [], profile: [], bags: [] },
  },
  setTriggerWords: (items, type) => {
    set((state) => {
      let wordsObj = { ...state.triggerWords };
      let triggerNames = Object.keys(resTriggerWords);
      forArrayLength(triggerNames, (name) => {
        forArrayLength(resTriggerWords[name], (string) => {
          var firstChar = umlautFix(string[0].toLowerCase());
          wordsObj[firstChar].bags.push({ string, ressource: name });
        });
      });

      forArrayLength(items, (item) => {
        if (item == null) console.log("in useStore item.string[0] = null ");
        let firstChar = item.string[0].toLowerCase();
        wordsObj[firstChar][type].push({
          string: item.string,
          item: item.item,
          language: item.language,
        });
      });
      return { triggerWords: wordsObj };
    });
  },
  recentlyTyped: [],
  addToRecentlyTyped: (uid, stringObj) => {
    set((state) => {
      let newList = [...state.recentlyTyped, stringObj];
      localStorage.setItem(uid + "recentlyTyped", JSON.stringify(newList));
      return { recentlyTyped: newList };
    });
  },

  setRecentlyTyped: (uid, newList) => {
    set((state) => {
      if (newList != null) {
        localStorage.setItem(uid + "recentlyTyped", JSON.stringify(newList));
        return { recentlyTyped: newList };
      }
    });
  },

  removeFromRecentlyTyped: (uid, stringId) => {
    set((state) => {
      let newList = [state.recentlyTyped.filter((s) => s.id != stringId)];
      localStorage.setItem(uid + "recentlyTyped", JSON.stringify(newList));
      return { recentlyTyped: newList };
    });
  },
  removeMultipleRecentlyTyped: (uid, stringIds) => {
    set((state) => {
      let newList = [state.recentlyTyped.filter((s) => !stringIds.includes(s))];
      localStorage.setItem(uid + "recentlyTyped", JSON.stringify(newList));
      return { recentlyTyped: newList };
    });
  },
}));

export default readStore;
