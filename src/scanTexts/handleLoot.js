import { fireItemAttributes } from "../AdminStuff/AdminLootStuff/fireItemAttributes";
import { specialAttributes } from "../AdminStuff/AdminLootStuff/specialAttributes";
import Loot from "../fire_classes/Loot";
import {
  addCustomItemToUserList,
  updateItemInUserList,
} from "../misc/handleFirestore";
import { updateItemInStorageAndState } from "../misc/helperFuncs";

function createLootObject(uid, fireItem, string, setFireItems) {
  let concatList = fireItemAttributes.concat(specialAttributes);

  updateItemInStorageAndState(d, "fireItems", fireItem, setFireItems);
  if (fireItem.firstFound == null) {
    fireItem.firstFound = dateToTimestamp(new Date());
    addCustomItemToUserList(uid, fireItem, "fireItems");
  } else updateItemInUserList(uid, fireItem, "fireItems");

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
    string
  );
  loot.kingdomItemId = fireItem.id;
  return loot;
}

export { createLootObject };
