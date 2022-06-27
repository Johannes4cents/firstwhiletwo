import React, { useEffect } from "react";
import { clamp, newTrim, umlautFix } from "../misc/helperFuncs";
import chatStore from "../stores/chatStore";
import readStore from "../stores/readStore";

const useCheckArraysForResTrigger = () => {
  const { triggerWords, resTrigger, setResTrigger, scanArrays } = readStore();

  const { displayedMessages } = chatStore();

  useEffect(() => {
    checkArrayForResTriggerWords();
  }, [displayedMessages, triggerWords]);

  async function checkArrayForResTriggerWords() {
    let newResTrigger = { ...resTrigger };

    for (
      let i = clamp(displayedMessages.length - 30, 0, displayedMessages.length);
      i < clamp(displayedMessages.length, 0, 30);
      i++
    ) {
      let contentArray = displayedMessages[i].msg
        .split(" ")
        .map((s) => {
          return newTrim(s);
        })
        .filter((s) => s.length > 0);

      for (let i = 0; i < contentArray.length; i++) {
        const string = contentArray[i];
        const firstChar = umlautFix(string[0].toLowerCase());
        const ressourceWords = firstChar
          ? triggerWords[firstChar].ressources
          : [];

        let foundRessource = ressourceWords.find((s) => s.string == string);
        if (foundRessource != null) {
          const foundId =
            newResTrigger[foundRessource.ressource].ids[foundRessource.id];

          if (foundId == null) {
            newResTrigger[foundRessource.ressource].ids[foundRessource.id] = {
              maxOccurences: foundRessource.maxOccurences,
              occurences: 1,
            };
            newResTrigger[foundRessource.ressource].weight =
              newResTrigger[foundRessource.ressource].weight +
              foundRessource.weight;
          } else {
            if (foundId.maxOccurences > foundId.occurences) {
              foundId.occurences += 1;
              newResTrigger[foundRessource.ressource].weight =
                newResTrigger[foundRessource.ressource].weight +
                foundRessource.weight;
            }
          }
        }
      }
    }
    setResTrigger(newResTrigger);
  }

  useEffect(() => {}, []);
};

export default useCheckArraysForResTrigger;
