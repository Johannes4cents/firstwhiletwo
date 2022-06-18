import React, { useEffect, useState } from "react";
import { updateTimeCheck } from "../misc/handleUpdates";
import { minutesToSeconds, newTrim } from "../misc/helperFuncs";
import userStore from "../stores/userStore";
import useTryStringForLoot from "./useTryStringForLoot";
import miscStore from "../stores/miscStore";
import { updateDocInFirestore } from "../misc/handleFirestore";

const useScanStringsInArray = (onScanFinnished) => {
  const scanString = useTryStringForLoot(onRessourceFound, onLootFound);
  const { info, setInfo } = userStore();
  const { setLastUpdates } = miscStore();
  const [currentArray, setCurrentArray] = useState(null);
  const [stringIndex, setStringIndex] = useState(0);
  function onLootFound(loot) {
    console.log("loot is - ", loot);
  }

  function onRessourceFound(ressource) {
    let newRessources = {
      ...info.ressources,
      [ressource.res]: {
        ...info.ressources[ressource.res],
        amount: info.ressources[ressource.res].amount + 1,
      },
    };

    let newInfo = { ...info, ressources: newRessources };
    setInfo(newInfo);
    if (updateTimeCheck("info", 2, setLastUpdates)) {
      updateDocInFirestore("users/", info.uid, "ressources", newRessources);
    }
  }

  function checkString(index) {
    setTimeout(() => {
      const string = currentArray.array[index];
      if (string != "" && string != " ") {
        scanString.tryStringForLoot(string);
        scanString.tryStringForRessource(string);
      }

      setStringIndex((index) => {
        return index + 1;
      });
    }, 150);
  }

  useEffect(() => {
    if (stringIndex != 0) {
      if (stringIndex < currentArray.array.length) checkString(stringIndex);
      else {
        setStringIndex(0);
        onScanFinnished();
      }
    }
  }, [stringIndex]);

  useEffect(() => {
    if (currentArray != null) {
      checkString(0);
    }
  }, [currentArray]);

  function scan(arrayObject) {
    setStringIndex(0);
    setCurrentArray(arrayObject);
  }

  return scan;
};

export default useScanStringsInArray;
