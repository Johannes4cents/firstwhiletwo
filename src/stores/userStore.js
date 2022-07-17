import React from "react";
import { a } from "react-spring";
import create from "zustand";
import { updateDocInFirestore } from "../misc/handleFirestore";

const userStore = create((set) => ({
  info: null,
  loggedIn: false,
  myGuy: {
    equippedItem: null,
    name: null,
    constitution: { health: 100, max: 100 },
    energy: { available: 100, max: 100 },
    gender: null,
    skills: [],
  },

  lastUpdated: {
    newInfo: null,
  },

  changeLastUpdated: (field, value) => {
    set((state) => {
      let newUpdated = { ...state.lastUpdated, [field]: value };
      localStorage.setItem(
        state.info.uid + "lastUpdated",
        JSON.stringify(newUpdated)
      );
      return { lastUpdated: newUpdated };
    });
  },
  changeGender: (uid, gender) => {
    set((state) => {
      let newGuy = { ...state.myGuy, gender };
      localStorage.setItem(uid, JSON.stringify(newGuy));
      return { myGuy: newGuy };
    });
  },

  setEquippedItem: (uid, item) => {
    set((state) => {
      let newGuy = { ...state.myGuy, equippedItem: item };
      localStorage.setItem(uid, JSON.stringify(newGuy));
      return { MyGuy: newGuy };
    });
  },
  changeMyGuyName: (uid, name) => {
    set((state) => {
      let newGuy = { ...state.myGuy, name };
      localStorage.setItem(uid, JSON.stringify(newGuy));
      return { myGuy: newGuy };
    });
  },
  changeMyGuyHealth: (uid, hps) => {
    set((state) => {
      let newGuy = {
        ...state.myGuy,
        constitution: {
          ...state.myGuy.constitution,
          health: state.myGuy.constitution.health + hps,
        },
      };
      localStorage.setItem(uid, JSON.stringify(newGuy));
      return { myGuy: newGuy };
    });
  },
  changeMyGuyMaxHealth: (uid, hps) => {
    set((state) => {
      let newGuy = {
        ...state.myGuy,
        constitution: {
          ...state.myGuy.constitution,
          max: state.myGuy.constitution.max + hps,
        },
      };
      localStorage.setItem(uid, JSON.stringify(newGuy));
      return { myGuy: newGuy };
    });
  },
  myAnswers: [],
  mediaFolder: [],
  addMediaFolder: (info, name) => {
    set((state) => {
      if (
        !state.mediaFolder
          .map((s) => s.toLowerCase())
          .includes(name.toLowerCase())
      ) {
        localStorage.setItem(
          info + "mediaFolder",
          JSON.stringify([...state.mediaFolder, name])
        );
        return { mediaFolder: [...state.mediaFolder, name] };
      }
    });
  },
  removeMediaFolder: (uid, folder) => {
    set((state) => {
      let newList = state.mediaFolder.filter((m) => m != folder);
      localStorage.setItem(uid + "mediaFolder", JSON.stringify(newList));
      return { mediaFolder: newList };
    });
  },
  setMediaFolder: (uid, folder) => {
    set((state) => {
      console.log("folder - ", folder);
      return { mediaFolder: folder };
    });
  },
  addAnswer: (uid, answer) => {
    set((state) => {
      let newAnswers = [
        ...state.myAnswers.filter(
          (a) =>
            !answer.statement.competitors.includes(a.statement.id) &&
            a.statement.id != answer.statement.id
        ),
        answer,
      ];
      localStorage.setItem(uid + "myAnswers", JSON.stringify(newAnswers));
      let newInfo = {
        ...state.info,
        updates: { ...(state.updates ?? {}), statements: true },
      };
      state.setInfo(newInfo);
      localStorage.setItem("info", JSON.stringify(newInfo));
      updateDocInFirestore(
        "users/",
        uid,
        "statements",
        newAnswers.map((a) => {
          return {
            ...a,
            statement: {
              statement: a.statement.id,
              flagId: a.statement.flagId,
            },
          };
        })
      );
      updateDocInFirestore("users/", uid, "updates", newInfo.updates);
      return { myAnswers: newAnswers, info: newInfo };
    });
  },

  setAnswers: (uid, answers) => {
    set((state) => {
      return { myAnswers: answers };
    });
  },
  setInfo: (info) => {
    localStorage.setItem("info", JSON.stringify(info));

    set((state) => {
      return { info: info, loggedIn: info != null };
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

  savedChats: [],
  setSavedChats: (uid, chats) => {
    set((state) => {
      return { savedChats: chats };
    });
  },
  addSavedChat: (uid, chat) => {
    set((state) => {
      if (!state.savedChats.map((c) => c.key).includes(chat.key)) {
        let newList = [...state.savedChats, chat];
        localStorage.setItem(uid + "savedChats", JSON.stringify(newList));
        return { savedChats: newList };
      }
    });
  },
}));

export default userStore;
