import {
  checkTimeDiff,
  dateToTimestamp,
  doAfterTimeDiffCheck,
  getRandomId,
  getRandomNumber,
  minutesToSeconds,
  testChance,
  umlautFix,
  objectToArray,
  updateItemInStorageAndState,
  forArrayLength,
} from "../misc/helperFuncs";
import readStore from "../stores/readStore";
import userStore from "../stores/userStore";

function useTryStringForLoot(onRessourcesFound, onFireItemFound) {
  const {
    resTrigger,
    recentlyTyped,
    removeMultipleRecentlyTyped,
    addToRecentlyTyped,
    setRecentlyTyped,
    triggerWords,
  } = readStore();

  const { info } = userStore();

  function removeOldRecentlyTypedEntries() {
    var foundOldEntries = [];
    const newTimestamp = dateToTimestamp(new Date());

    for (let i = 0; i < recentlyTyped.length; i++) {
      let item = recentlyTyped[i];
      const timeDiff = checkTimeDiff(item.timestamp, newTimestamp);
      if (timeDiff >= 2) foundOldEntries.push(item.id);
    }
    removeMultipleRecentlyTyped(info.uid, foundOldEntries);
  }

  function findFireItem(string) {
    let firstChar = umlautFix(string[0].toLowerCase());
    let lootStrings = firstChar ? triggerWords[firstChar].loot : [];

    const foundFireItems = lootStrings.filter(
      (s) => s.string == string && s.language == (info.language ?? "english")
    );
    var lucky = false;
    forArrayLength(foundFireItems, (foundFireItem) => {
      if (lucky) return;
      if (foundFireItem != null) {
        let itemTriggerWords = foundFireItem.item.triggerWords;
        const triggerWord = itemTriggerWords.find((tw) =>
          tw.obj.words[info.language].includes(string.toLowerCase())
        );
        if (triggerWord.firstFound == null) {
          lucky = testChance(triggerWord.chance, 10000);
          if (lucky) {
            triggerWord.firstFound = dateToTimestamp(new Date());
            triggerWord.lastFound = dateToTimestamp(new Date());
          }
        } else {
          lucky = testChance(triggerWord.chance / 2, 10000);
          if (lucky) triggerWord.lastFound = dateToTimestamp(new Date());
        }
        if (lucky) {
          onFireItemFound(foundFireItem.item, string);
        }

        let checkedString = {
          string: string,
          timestamp: dateToTimestamp(new Date()),
          id: getRandomId(),
        };
        addToRecentlyTyped(info.uid, checkedString);
      }
    });
  }

  function getModificator() {
    let cats = Object.keys(resTrigger);
    let obj = {};
    for (let i = 0; i < cats.length; i++) {
      let cat = cats[i];
      obj[cat] = resTrigger[cat].length * 0.2;
    }
    return obj;
  }

  function getRightRessource(bag) {
    const resTriggerArray = objectToArray(resTrigger).sort((a, b) => {
      return a.value.length < b.value.length ? 1 : -1;
    });

    let sortedTrigger = resTriggerArray.map((kv) => {
      return kv.key;
    });

    const sortedBag = objectToArray(bag)
      .map((r, i) => {
        return {
          res: r.key,
          amount: r.value,
          index: sortedTrigger.indexOf(r.key),
        };
      })
      .sort((a, b) => {
        return a.index > b.index ? 1 : -1;
      });

    return sortedBag[0];
  }

  function tryForRessource(modificator) {
    let ressources = Object.keys(info.ressources);
    let obj = {};
    for (let i = 0; i < ressources.length; i++) {
      const resName = ressources[i];
      if (
        testChance(
          modificator[resName] * 10,
          info.ressources[resName].dropChance
        )
      )
        obj[resName] = 1;
    }

    return obj;
  }

  function tryStringForRessource(string, fromReading) {
    if (!recentlyTyped.includes(string)) {
      const bagFound = fromReading ? testChance(10, 100) : testChance(10, 100);
      if (bagFound) {
        let ressource = getRightRessource(tryForRessource(getModificator()));
        if (ressource != null) onRessourcesFound(ressource);
      }
    }
  }

  function tryStringForLoot(string) {
    // check if the string has been typed within the last 5 minutes
    const recentlTypedString = recentlyTyped.find((o) => o.string == string);

    if (true) {
      findFireItem(string);
    } else {
      const newTimestamp = dateToTimestamp(new Date());
      const timeDiff = checkTimeDiff(
        recentlTypedString.timestamp,
        newTimestamp
      );
      if (timeDiff >= 5) {
        findFireItem(string);
        const updatedFoundString = {
          ...recentlTypedString,
          timestamp: dateToTimestamp(new Date()),
        };

        doAfterTimeDiffCheck(
          info.uid,
          "removedOldRecentlyTyped",
          removeOldRecentlyTypedEntries(),
          minutesToSeconds(5)
        );

        updateItemInStorageAndState(
          info.uid,
          "recentlyTyped",
          updatedFoundString,
          setRecentlyTyped
        );
      }
    }
  }

  return {
    tryStringForLoot,
    tryStringForRessource,
  };
}

export default useTryStringForLoot;
