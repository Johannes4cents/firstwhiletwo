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
  religion: [],
};

const readStore = create((set) => ({
  fireItems: [],
  setFireItems: (uid, items, onItemsNull) => {
    set((state) => {
      if (items != null) {
        localStorage.setItem(uid + "fireItems", JSON.stringify(items));
        // setTriggerWords
        const triggerWords = [];
        forArrayLength(items, (item) => {
          forArrayLength(item.triggerWords, (tWord) => {
            forArrayLength(tWord.obj.words.english, (string) => {
              const triggerWord = {
                string,
                item,
                language: "english",
              };
              triggerWords.push(triggerWord);
            });
            forArrayLength(tWord.obj.words.german, (string) => {
              const triggerWord = {
                string,
                item,
                language: "german",
              };
              triggerWords.push(triggerWord);
            });
          });
        });
        state.setTriggerWords(triggerWords, "loot");
        return { fireItems: items };
      } else {
        if (onItemsNull != null) onItemsNull();
      }
    });
  },

  resTrigger: { ...resetResTrigger },
  setResTrigger: (resTrigger) => {
    set(() => {
      return { resTrigger };
    });
  },
  scanningArrays: false,
  setScanningArrays: (bool) => {
    set(() => {
      return { scanningArrays: bool };
    });
  },
  scanArraysIndex: 0,
  increaseScanArraysIndex: () => {
    set((state) => {
      return { scanArraysIndex: state.scanArraysIndex + 1 };
    });
  },
  resetScanArraysIndex: () => {
    set((state) => {
      return { scanArraysIndex: 0 };
    });
  },

  scanArrays: [],
  setScanArrays: (uid, list) => {
    set(() => {
      localStorage.setItem(uid + "scanArrays", JSON.stringify(list));
      return { scanArrays: list };
    });
  },
  resetScanArrays: (uid) => {
    localStorage.setItem(uid + "scanArrays", JSON.stringify([]));
    set(() => {
      return { scanArrays: [] };
    });
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
    a: { loot: [], profile: [], ressources: [] },
    b: { loot: [], profile: [], ressources: [] },
    c: { loot: [], profile: [], ressources: [] },
    d: { loot: [], profile: [], ressources: [] },
    e: { loot: [], profile: [], ressources: [] },
    f: { loot: [], profile: [], ressources: [] },
    g: { loot: [], profile: [], ressources: [] },
    h: { loot: [], profile: [], ressources: [] },
    i: { loot: [], profile: [], ressources: [] },
    j: { loot: [], profile: [], ressources: [] },
    k: { loot: [], profile: [], ressources: [] },
    l: { loot: [], profile: [], ressources: [] },
    m: { loot: [], profile: [], ressources: [] },
    n: { loot: [], profile: [], ressources: [] },
    o: { loot: [], profile: [], ressources: [] },
    p: { loot: [], profile: [], ressources: [] },
    q: { loot: [], profile: [], ressources: [] },
    r: { loot: [], profile: [], ressources: [] },
    s: { loot: [], profile: [], ressources: [] },
    t: { loot: [], profile: [], ressources: [] },
    u: { loot: [], profile: [], ressources: [] },
    v: { loot: [], profile: [], ressources: [] },
    w: { loot: [], profile: [], ressources: [] },
    x: { loot: [], profile: [], ressources: [] },
    y: { loot: [], profile: [], ressources: [] },
    z: { loot: [], profile: [], ressources: [] },
  },
  setTriggerWords: (items, type) => {
    set((state) => {
      let wordsObj = { ...state.triggerWords };
      let triggerNames = Object.keys(resTriggerWords);
      forArrayLength(triggerNames, (name) => {
        forArrayLength(resTriggerWords[name], (string) => {
          var firstChar = umlautFix(string[0].toLowerCase());
          wordsObj[firstChar].ressources.push({ string, ressource: name });
        });
      });
      forArrayLength(items, (item) => {
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
  clearRecentlyTyped: () => {
    set(() => {
      return { recentlyTyped: [] };
    });
  },
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
