import { fireItemAttributes } from "../AdminStuff/AdminLootStuff/fireItemAttributes";
import { specialAttributes } from "../AdminStuff/AdminLootStuff/specialAttributes";
import Loot from "../fire_classes/Loot";
import {
  addCustomItemToUserList,
  updateItemInUserList,
} from "../misc/handleFirestore";
import {
  dateToTimestamp,
  getItemById,
  getRandomNumber,
  newTrim,
  updateItemInStorageAndState,
} from "../misc/helperFuncs";
import veryCommonEnglish from "../misc/lists/veryCommonEnglish";
import veryCommonGerman from "../misc/lists/veryCommonGerman";

function createLootObject(uid, fireItem, string, setFireItems, messageId) {
  let concatList = fireItemAttributes.concat(specialAttributes);

  updateItemInStorageAndState(uid, "fireItems", fireItem, setFireItems);
  if (fireItem.firstFound == null) {
    fireItem.firstFound = dateToTimestamp(new Date());
    addCustomItemToUserList(uid, fireItem, "fireItems");
  } else updateItemInUserList(uid, "fireItems", fireItem, "id", fireItem.id);

  // create the concrete attributes from the payloads
  const createdAttributes = [];
  for (let i = 0; i < fireItem.attributes.length; i++) {
    const attribute = fireItem.attributes[i];
    const lootAttribute = getItemById(attribute.id, concatList);
    const createdAttribute = lootAttribute.createAttribute(
      attribute.payload.one,
      attribute.payload.two,
      attribute.payload.three,
      attribute.payload.four
    );
    createdAttributes.push(createdAttribute);
  }

  // create the Loot object
  let loot = new Loot(
    fireItem.name,
    createdAttributes,
    fireItem.imgUrl,
    fireItem.type,
    string,
    fireItem.id,
    fireItem.upvotes,
    messageId
  );
  loot.fireItemId = fireItem.id;
  return loot;
}

function getConnectedStringFromMessage(language, message) {
  let langObj = {
    english: veryCommonEnglish,
    german: veryCommonGerman,
  };
  let msgArray = newTrim(message.msg)
    .split(" ")
    .filter((s) => !langObj[language].includes(s) && s.length > 2);

  let randomString = msgArray[getRandomNumber(0, msgArray.length - 1)];
  return randomString ?? "firstwhile";
}

export { createLootObject, getConnectedStringFromMessage };
