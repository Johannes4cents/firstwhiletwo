import React from "react";
import create from "zustand";
import {
  dateToTimestamp,
  forArrayLength,
  umlautFix,
} from "../misc/helperFuncs";
import alphabet from "../misc/lists/alphabet";
import { ressources } from "../misc/lists/otherLists";

const getResTrigger = () => {
  let obj = {};
  forArrayLength(ressources, (ressource) => {
    obj[ressource] = { weight: 0, ids: {} };
  });
  return obj;
};

const readStore = create((set) => ({
  fireItems: [],
  addFireItem: (uid, fireItem) => {
    set((state) => {
      let newList = [...state.fireItems, fireItem];
      localStorage.setItem(uid + "fireItems", JSON.stringify(newList));
      return { fireItems: newList };
    });
  },
  setFireStuff: (uid, items, resWords, onItemsNull) => {
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
        state.setTriggerWords(triggerWords, resWords);
        return { fireItems: items };
      } else {
        if (onItemsNull != null) onItemsNull();
      }
    });
  },

  resTrigger: getResTrigger(),
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

  triggerWords: {},
  setTriggerWords: (items, resWords) => {
    set((state) => {
      let wordsObj = {};
      forArrayLength(alphabet, (char) => {
        wordsObj[char] = { loot: [], profile: [], ressources: [] };
      });

      forArrayLength(resWords, (resWord) => {
        let firstChar = umlautFix(resWord.string[0]).toLowerCase();
        wordsObj[firstChar].ressources.push(resWord);
      });

      forArrayLength(items, (item) => {
        let firstChar = umlautFix(item.string[0]).toLowerCase();
        wordsObj[firstChar]["loot"].push(item);
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
