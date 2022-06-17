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
} from "../misc/helperFuncs";
import readStore from "../stores/readStore";
import userStore from "../stores/userStore";

function useTryStringForLoot(onRessourcesFound, onLootFound) {
  const {
    resTrigger,
    recentlyTyped,
    removeMultipleRecentlyTyped,
    addToRecentlyTyped,
    setRecentlyTyped,
  } = readStore();

  const { info, triggerWords } = userStore();

  function removeOldRecentlyTypedEntries() {
    var foundOldEntries = [];
    const newTimestamp = dateToTimestamp(new Date());
    console.log(
      "recentlyTyped.length in removeOldRecently",
      recentlyTyped.length
    );
    for (let i = 0; i < recentlyTyped.length; i++) {
      let item = recentlyTyped[i];
      const timeDiff = checkTimeDiff(item.timestamp, newTimestamp);
      if (timeDiff >= 2) foundOldEntries.push(item.id);
    }
    removeMultipleRecentlyTyped(info.uid, foundOldEntries);
  }

  function findItem(string) {
    let firstChar = umlautFix(string[0].toLowerCase());
    let lootStrings = firstChar ? triggerWords[firstChar].loot : [];
    const foundLoot = lootStrings.find((s) => s == string);
    var lucky = false;
    if (foundLoot != null) {
      const phrase = foundLoot.item.phrases[foundLoot.language].find(
        (s) => s == foundLoot.string
      );
      if (phrase.firstFound == null) {
        lucky = testChance(phrase.chance, 10000);
        if (lucky) {
          phrase.firstFound = dateToTimestamp(new Date());
          phrase.lastFound = dateToTimestamp(new Date());
        }
      } else {
        lucky = testChance(phrase.chance / 2, 10000);
        if (lucky) phrase.lastFound = dateToTimestamp(new Date());
      }
      if (lucky) {
        onLootFound(foundLoot.item, string);
      }

      let checkedString = {
        string: string,
        timestamp: dateToTimestamp(new Date()),
        id: getRandomId(),
      };
      addToRecentlyTyped(info.uid, checkedString);
    }
  }

  function getModificator() {
    return {
      happiness:
        (resTrigger.happiness.length > 2 ? 0.2 : 0) +
        resTrigger.happiness.length * 0.2,
      rage:
        (resTrigger.rage.length > 2 ? 0.2 : 0) + resTrigger.rage.length * 0.2,
      oil: (resTrigger.oil.length > 2 ? 0.5 : 0) + resTrigger.oil.length * 0.2,
      ammunition:
        (resTrigger.weapons.length > 2 ? 0.2 : 0) +
        resTrigger.weapons.length * 0.2,
      mana:
        (resTrigger.mana.length > 2 ? 0.2 : 0) + resTrigger.mana.length * 0.2,
      energy:
        (resTrigger.energy.length > 2 ? 0.2 : 0) +
        resTrigger.energy.length * 0.2,
      food:
        (resTrigger.food.length > 2 ? 0.2 : 0) + resTrigger.food.length * 0.2,
      knowledge:
        (resTrigger.knowledge.length > 2 ? 0.2 : 0) +
        resTrigger.knowledge.length * 0.2,
      diplomacy:
        (resTrigger.diplomacy.length > 2 ? 0.2 : 0) +
        resTrigger.diplomacy.length * 0.2,
      science:
        (resTrigger.science.length > 2 ? 0.2 : 0) +
        resTrigger.science.length * 0.2,
      fear:
        (resTrigger.fear.length > 2 ? 0.2 : 0) + resTrigger.fear.length * 0.2,
      health:
        (resTrigger.health.length > 2 ? 0.2 : 0) +
        resTrigger.health.length * 0.2,
      love:
        (resTrigger.love.length > 2 ? 0.2 : 0) + resTrigger.love.length * 0.2,
      cash:
        (resTrigger.cash.length > 2 ? 0.2 : 0) + resTrigger.cash.length * 0.2,
    };
  }

  function getRightRessource(ressource) {
    const dropChances = info.dropChances;
    const ressourceKeys = Object.keys(dropChances);
    const ressourceValues = Object.values(dropChances);
    const sortedDropChances = ressourceKeys
      .map((key, index) => {
        return { key, chance: ressourceValues[index] };
      })
      .sort((a, b) => (a.chance < b.chance ? 1 : -1));

    const bagArray = objectToArray(ressource)
      .filter((kv) => kv.value > 0)
      .map((kv) => {
        return {
          ...kv,
          index: sortedDropChances.map((dc) => dc.key).indexOf(kv.key),
        };
      })
      .sort((a, b) => (a.index < b.index ? 1 : -1));

    return bagArray[0];
  }

  function tryForRessource(resObj) {
    let dropChances = d.kingdom.stats.dropChances;
    let obj = {
      weapons: 0,
      food: 0,
      gold: 0,
      happiness: 0,
      mana: 0,
      oil: 0,
      rage: 0,
      energy: 0,
      science: 0,
      knowledge: 0,
      fear: 0,
      diplomacy: 0,
      cash: 0,
      love: 0,
    };
    obj.weapons = testChance(resObj.weapons * 10, dropChances.weapons)
      ? getRandomNumber(1, 3)
      : 0;
    obj.food = testChance(resObj.food * 10, dropChances.food)
      ? getRandomNumber(1, 3)
      : 0;
    obj.happiness = testChance(resObj.happiness * 10, dropChances.happiness)
      ? getRandomNumber(1, 3)
      : 0;
    obj.mana = testChance(resObj.mana * 10, dropChances.mana)
      ? getRandomNumber(1, 3)
      : 0;
    obj.oil = testChance(resObj.oil * 10, dropChances.oil)
      ? getRandomNumber(1, 3)
      : 0;
    obj.rage = testChance(resObj.rage * 10, dropChances.rage)
      ? getRandomNumber(1, 3)
      : 0;
    obj.energy = testChance(resObj.energy * 10, dropChances.energy)
      ? getRandomNumber(1, 3)
      : 0;
    obj.science = testChance(resObj.science * 10, dropChances.science)
      ? getRandomNumber(1, 3)
      : 0;
    obj.knowledge = testChance(resObj.knowledge * 10, dropChances.knowledge)
      ? getRandomNumber(1, 3)
      : 0;
    obj.fear = testChance(resObj.fear * 10, dropChances.fear)
      ? getRandomNumber(1, 3)
      : 0;
    obj.diplomacy = testChance(resObj.diplomacy * 10, dropChances.diplomacy)
      ? getRandomNumber(1, 3)
      : 0;
    obj.cash = testChance(resObj.cash * 10, dropChances.cash)
      ? getRandomNumber(1, 3)
      : 0;
    obj.love = testChance(resObj.love * 10, dropChances.love)
      ? getRandomNumber(1, 3)
      : 0;
    return obj;
  }

  function tryStringForRessource(string, fromReading) {
    if (!d.recentlyTyped.includes(string)) {
      const bagFound = fromReading ? testChance(1, 10) : testChance(1, 20);
      if (bagFound) {
        let ressource = getRightRessource(tryForRessource(getModificator()));
        if (ressource != null) onRessourcesFound(ressource);
      }
    }
  }

  function tryStringForLoot(string) {
    const connectedStrings = d.pageLoot.loot.map((l) => l.connectedString);
    const recentlyTyped = d.recentlyTyped;

    if (connectedStrings.includes(string)) return;
    // check if the string has been typed within the last 5 minutes
    const foundString = recentlyTyped.find((o) => o.string == string);
    if (foundString == null) {
      findItem(string);
    } else {
      const newTimestamp = dateToTimestamp(new Date());
      const timeDiff = checkTimeDiff(foundString.timestamp, newTimestamp);
      if (timeDiff >= 5) {
        findItem(string);
        const updatedFoundString = {
          ...foundString,
          timestamp: dateToTimestamp(new Date()),
        };

        doAfterTimeDiffCheck(
          d.info.uid,
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
