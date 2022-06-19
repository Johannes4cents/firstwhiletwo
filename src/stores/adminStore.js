import React from "react";
import create from "zustand";
import { addItemToGeneralList } from "../misc/handleFirestore";
import { getRandomId } from "../misc/helperFuncs";

const adminStore = create((set) => ({
  triggerWordCats: [],
  triggerWords: [],
  selectedTriggerWordCats: [],
  addRemoveSelectedWordCat: (wordCat) => {
    set((state) => {
      if (
        state.selectedTriggerWordCats.map((wc) => wc.id).includes(wordCat.id)
      ) {
        return {
          selectedTriggerWordCats: state.selectedTriggerWordCats.filter(
            (wc) => wc.id != wordCat.id
          ),
        };
      } else
        return {
          selectedTriggerWordCats: [...state.selectedTriggerWordCats, wordCat],
        };
    });
  },
  addWordCat: (wordCatText) => {
    set((state) => {
      if (
        !state.triggerWordCats
          .map((wc) => wc.text)
          .includes(wordCatText.toLowerCase())
      ) {
        const newWc = {
          id: getRandomId(),
          text: wordCatText.toLowerCase(),
          words: [],
        };
        addItemToGeneralList("triggerWordCats", newWc);
        return {
          triggerWordCats: [...state.triggerWordCats, newWc],
          selectedTriggerWordCats: [...state.selectedTriggerWordCats, newWc],
        };
      }
    });
  },
  setTriggerWordCats: (wordCats) => {
    set(() => {
      return { triggerWordCats: wordCats };
    });
  },
  setTriggerWords: (words) => {
    set(() => {
      return { triggerWords: words };
    });
  },
  addTriggerWord: (word, german, otherWordsObj) => {
    set((state) => {
      if (
        !state.triggerWords
          .map((w) => w.text.english)
          .includes(word.toLowerCase())
      ) {
        const newWord = {
          text: { english: word.toLowerCase(), german: german.toLowerCase() },
          cats: state.selectedTriggerWordCats.map((wc) => wc.id),
          words: otherWordsObj,
        };
        console.log("newWord is - ", newWord);
        addItemToGeneralList("triggerWords", newWord);
        return {
          triggerWords: [...state.triggerWords, newWord],
        };
      }
    });
  },
}));

export default adminStore;
