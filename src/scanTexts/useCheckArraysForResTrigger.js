import React, { useEffect } from "react";
import { umlautFix } from "../misc/helperFuncs";
import readStore from "../stores/readStore";

const useCheckArraysForResTrigger = () => {
  const {
    triggerWords,
    resTrigger,
    setResTrigger,
    scanArrays,
    displayedMessages,
  } = readStore();

  useEffect(() => {
    checkArrayForResTriggerWords();
  }, [displayedMessages, triggerWords]);

  async function checkArrayForResTriggerWords() {
    let newResTrigger = { ...resTrigger };

    for (let i = 0; i < scanArrays.length; i++) {
      let contentArray = scanArrays[i].array;

      for (let i = 0; i < contentArray.length; i++) {
        const string = contentArray[i];

        const firstChar = umlautFix(string[0].toLowerCase());
        const ressourceWords = firstChar
          ? triggerWords[firstChar].ressources
          : [];

        let foundRessource = ressourceWords.find((s) => s.string == string);
        if (foundRessource != null) {
          if (!newResTrigger[foundRessource.ressource].includes(string))
            newResTrigger[foundRessource.ressource].push(string);
        }
      }
    }
    setResTrigger(newResTrigger);
  }
};

export default useCheckArraysForResTrigger;
