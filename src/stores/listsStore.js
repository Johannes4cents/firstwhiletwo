import React from "react";
import create from "zustand";
import { docsToLoot } from "../fire_classes/Loot";
import {
  addItemToUserList,
  addLootInFirestore,
  deleteItemInUserList,
  updateLootItemInUserList,
} from "../misc/handleFirestore";
import { forArrayLength } from "../misc/helperFuncs";

const listsStore = create((set) => ({
  loot: [],
  setLoot: (uid, loot) => {
    localStorage.setItem(uid + "loot", JSON.stringify(docsToLoot(loot)));
    set(() => {
      return { loot: docsToLoot(loot) };
    });
  },
  updateLootItem: (uid, item) => {
    set((state) => {
      let newList = [...state.loot];
      let index = state.loot.map((l) => l.id).indexOf(item.id);
      newList[index] = item;
      updateLootItemInUserList(uid, item);
      localStorage.setItem(uid + "loot", JSON.stringify(newList));
      return { loot: newList };
    });
  },
  addLoot: (uid, item) => {
    set((state) => {
      localStorage.setItem(uid + "loot", JSON.stringify([...state.loot, item]));
      addLootInFirestore(uid, item);
      return { loot: [...state.loot, item] };
    });
  },
  removeLoot: (uid, item) => {
    set((state) => {
      let newList = state.loot.filter((i) => i.id != item.id);
      deleteItemInUserList(uid, "loot", "id", item.id, false);
      localStorage.setItem(uid + "loot", JSON.stringify(newList));
      return { loot: newList };
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
  suggestedStrains: [],
  setSuggestedStrains: (list) => {
    set((state) => {
      return { suggestedStrains: list };
    });
  },
  changeSuggestedStrains: (uid, strain) => {
    set((state) => {
      var list = [];
      if (!state.suggestedStrains.map((s) => s.id).includes(strain.id))
        list = [...state.suggestedStrains, strain];
      else list = state.suggestedStrains.filter((s) => s.id != strain.id);
      localStorage.setItem(uid + "suggestedStrains", JSON.stringify(list));
      return {
        suggestedStrains: list.sort((a, b) => (a.text > b.text ? 1 : -1)),
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
      const activeList = [...state.activeStrains, strain];
      localStorage.setItem(uid + "myStrains", JSON.stringify(newList));
      localStorage.setItem(uid + "activeStrains", JSON.stringify(activeList));
      return { myStrains: newList, activeStrains: activeList };
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
  setActiveStrains: (uid, strains) => {
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
  fireFlags: [],
  statements: [],
  setFireFlags: (uid, flags) => {
    set((state) => {
      let fireStatements = [];
      forArrayLength(flags, (flag) => {
        let statementIds = flag.statements.map((s) => s.id);
        forArrayLength(flag.statements, (statement) => {
          statement.competitors = statementIds.filter(
            (id) => id != statement.id
          );
          fireStatements.push(statement);
        });
      });

      localStorage.setItem(uid + "fireFlags", JSON.stringify(flags));
      return { fireFlags: flags, statements: fireStatements };
    });
  },
  myMedia: [],
  setMyMedia: (uid, media) => {
    set((state) => {
      localStorage.setItem(uid + "myMedia", JSON.stringify(media));
      return { myMedia: media };
    });
  },
  addMyMedia: (uid, item) => {
    set((state) => {
      if (!state.myMedia.map((s) => s.name).includes(item.name)) {
        let newList = [...state.myMedia, item];
        localStorage.setItem(uid + "myMedia", JSON.stringify(newList));
        addItemToUserList(uid, "myMedia", item);
        return { myMedia: newList };
      }
    });
  },
  removeMyMedia: (uid, item) => {
    set((state) => {
      let newList = state.myMedia.filter((m) => m.id != item.id);
      localStorage.setItem(uid + "myMedia", JSON.stringify(newList));
      return { myMedia: newList };
    });
  },
  turfChats: [],
  setTurfChats: (chats) => {
    set((state) => {
      return { turfChats: chats };
    });
  },
  otherUser: [],
  setOtherUser: (uid, user) => {
    set((state) => {
      return { otherUser: user.filter((u) => u.id != uid) };
    });
  },
  userComparissons: [],
  setUserComparissons: (info, comparissons) => {
    set((state) => {
      return { userComparissons: comparissons };
    });
  },
  addUserComparissons: (uid, comps) => {
    set((state) => {
      let newList = [
        ...state.userComparissons.filter(
          (c) => !comps.map((co) => co.id).includes(c.id)
        ),
        ...comps,
      ];
      localStorage.setItem(uid + "userComparissons", JSON.stringify(newList));
      return { userComparissons: newList };
    });
  },
}));

export default listsStore;
