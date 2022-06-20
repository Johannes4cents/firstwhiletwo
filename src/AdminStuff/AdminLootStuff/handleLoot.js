import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getCustomList, getGeneralList } from "../../misc/handleFirestore.js";
import db from "../../firebase/fireInit.js";

async function getKingdomFromFirestore(info) {
  const userDocRef = doc(db, "users/", info.uid);
  const userDoc = await getDoc(userDocRef);
  return (
    userDoc.data().kingdom ?? {
      spells: [],
      buildings: [],
      items: [],
      creatures: [],
      stats: {},
      ressources: { gold: 0, mana: 0 },
    }
  );
}

async function getPureFirestoreFireItems(info, onItemsRetrieved) {
  const lootDocRef = doc(db, "general/", "fireItems");
  const lootDoc = await getDoc(lootDocRef);
  const items = lootDoc.data()["items"] ?? [];
  const spells = lootDoc.data()["spells"] ?? [];
  const creatures = lootDoc.data()["creatures"] ?? [];
  const buildings = lootDoc.data()["buildings"] ?? [];
  const events = lootDoc.data()["events"] ?? [];

  const list = items
    .concat(spells)
    .concat(creatures)
    .concat(buildings)
    .concat(events);

  onItemsRetrieved(list);
}

async function getFireItems(info, onItemsRetrieved) {
  console.log("getFireItems called");
  const lootDocRef = doc(db, "general/", "fireItems");
  const lootDoc = await getDoc(lootDocRef);
  const items = lootDoc.data()["items"] ?? [];
  const spells = lootDoc.data()["spells"] ?? [];
  const creatures = lootDoc.data()["creatures"] ?? [];
  const buildings = lootDoc.data()["buildings"] ?? [];
  const events = lootDoc.data()["events"] ?? [];

  const localList = JSON.parse(localStorage.getItem(info.uid + "loot")) ?? [];
  const localIds = localList.map((i) => i.id);

  if (localList.length < 1) {
    getGeneralList("fireItems", (firestoreItems) => {
      const list = items
        .concat(spells)
        .concat(creatures)
        .concat(buildings)
        .concat(events);

      console.log("fireStoreItems are - ", firestoreItems);
      firestoreItems.forEach((i) => localList.push(i));

      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (!localIds.includes(item.id)) localList.push(item);
      }

      onItemsRetrieved(localList);
    });
  }
}

async function addItemToFireItemsList(item, collection) {
  const docRef = doc(db, "general/", "fireItems");

  const lootDoc = await getDoc(docRef);
  const list = lootDoc.data()[collection];
  if (list != null) {
    updateDoc(docRef, { [collection]: [...list, item] });
  } else {
    updateDoc(docRef, { [collection]: [item] });
  }
}

async function updateItemInFireItemsList(item, collection) {
  const docRef = doc(db, "general", "fireItems");
  const lootDoc = await getDoc(docRef);
  const list = lootDoc.data()[collection].filter((i) => i.id != item.id);
  updateDoc(docRef, { [collection]: [...list, item] });
}

async function deleteItemInFireItemsList(id, collection) {
  const docRef = doc(db, "general", "fireItems");

  const query = await getDoc(docRef);
  const list = query.data()[collection].filter((i) => i.id != id);
  updateDoc(docRef, { [collection]: list });
}

export {
  getKingdomFromFirestore,
  addItemToFireItemsList,
  updateItemInFireItemsList,
  deleteItemInFireItemsList,
  getFireItems,
  getPureFirestoreFireItems,
};
