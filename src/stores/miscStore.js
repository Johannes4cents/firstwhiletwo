import React from "react";
import create from "zustand";
import { clickThroughIndex, dateToTimestamp } from "../misc/helperFuncs";

const miscStore = create((set) => ({
  inputWidth: 0,
  setInputWidth: (width) => {
    set(() => {
      return { inputWidth: width };
    });
  },
  inputHeight: 0,
  setInputHeight: (height) => {
    set(() => {
      return { inputHeight: height };
    });
  },
  attachedItemHeight: 0,
  setAttachedItemHeight: (height) => {
    set(() => {
      return { attachedItemHeight: height };
    });
  },
  attachedImagesHeight: 0,
  setAttachedImagesHeight: (height) => {
    set(() => {
      return { attachedImagesHeight: height };
    });
  },
  modalOpen: false,
  closeModal: () => {
    set(() => {
      return { modalOpen: false };
    });
  },
  openModal: () => {
    set(() => {
      return { modalOpen: true };
    });
  },
  contextContent: null,
  setContextContent: (menu) => {
    set((state) => {
      return { contextContent: menu };
    });
  },
  dragCursor: null,
  setDragCursor: (cursor) => {
    set((state) => {
      return { dragCursor: cursor };
    });
  },
  lastUpdates: { info: null, votes: null, fireFlags: null },
  setLastUpdates: (lastUpdates) => {
    localStorage.setItem("lastUpdates", JSON.stringify(lastUpdates));
    set(() => {
      return { lastUpdates };
    });
  },
  lastActive: null,
  updateLastActive: () => {
    set(() => {
      return { lastActive: dateToTimestamp(new Date()) };
    });
  },
  toUpdateStuff: { votes: [] },
  setToUpdateStuff: (uid, stuff) => {
    localStorage.setItem(uid + "toUpdateStuff", JSON.stringify(stuff));
    set((state) => {
      return { toUpdateStuff: stuff };
    });
  },
  addToUpdateList: (uid, list, item) => {
    set((state) => {
      let newList = [...state.toUpdateStuff[list]];
      let index = newList.map((i) => i.id).indexOf(item.id);
      newList[index] = item;
      let newStuff = {
        ...state.toUpdateStuff,
        [list]: newList,
      };
      localStorage.setItem(uid + "toUpdateStuff", JSON.stringify(list));
      return { toUpdateStuff: newStuff };
    });
  },
  clearUpdateList: (uid, list) => {
    set((state) => {
      let newStuff = { ...state.toUpdateStuff, [list]: [] };
      localStorage.setItem(uid + "toUpdateStuff", JSON.stringify(list));
      return { toUpdateStuff: newStuff };
    });
  },
  clickedImages: { index: 0, images: [] },
  setClickedImages: (images, index) => {
    set((state) => {
      return { clickedImages: { index, images } };
    });
  },
  clearClickedImages: () => {
    set((state) => {
      return { clickedImages: { index: 0, images: [] } };
    });
  },

  changeClickedImageIndex: (number) => {
    set((state) => {
      let newIndex = clickThroughIndex(
        state.clickedImages.images,
        state.clickedImages.images[state.clickedImages.index],
        number
      );
      return {
        clickedImages: {
          ...state.clickedImages,
          index: newIndex,
        },
      };
    });
  },
}));

export default miscStore;
