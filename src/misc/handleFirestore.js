import { async } from "@firebase/util";
import {
  increment,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import db, { storage } from "../firebase/fireInit";

async function getInfoFromRawId(rawId, afterFunc) {
  var fireInfo = null;
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("rawId", "==", rawId));
  const docs = await getDocs(q);
  docs.forEach((doc) => {
    fireInfo = doc.data();
  });

  if (afterFunc != null) afterFunc(fireInfo);
}

async function getSingleDocFromFirestore(collection, docId, thenFunc, payload) {
  let docRef = doc(db, collection, docId);
  const result = await getDoc(docRef);
  thenFunc(result.data(), payload);
}

async function getCollectionFromUserFirestore(
  uid,
  collectionName,
  afterfunc = null
) {
  const path = "users/" + uid + "/" + collectionName;
  const querySnapshot = await getDocs(collection(db, path));
  const list = [];
  querySnapshot.forEach((d) => {
    list.push(d.data());
  });
  if (afterfunc != null) {
    afterfunc(list);
  }
}

async function updateDocInFirestore(
  path,
  id,
  fieldName,
  value,
  thenFunc = null
) {
  const docRef = doc(db, path, id.toString());

  await updateDoc(docRef, { [fieldName]: value }).then((msg) => {
    if (thenFunc != null) {
      thenFunc(msg);
    }
  });
}

async function setDocInFirestore(path, id, data, thenFunc) {
  const docRef = doc(db, path, id);
  await setDoc(docRef, data).then((msg) => {
    if (thenFunc != null) thenFunc(msg);
  });
}

async function deleteDocInFirestore(path, id, thenFunc) {
  const docRef = doc(db, path, id);
  await deleteDoc(docRef).then((msg) => {
    if (thenFunc != null) thenFunc(msg);
  });
}

function getCollectionListener(colRef, onCollection) {
  const collectionRef = collection(db, colRef);
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    let items = [];
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    onCollection(items, unsubscribe);
  });
}

function getDocListener(col, id, onChange) {
  const docRef = doc(db, col, id);
  onSnapshot(docRef, (doc) => {
    onChange(doc.data());
  });
}

async function getGeneralList(name, onListRetrieved) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    const list = snapshot.data()[name];
    onListRetrieved(list);
  });
}

async function addItemToGeneralList(list, item) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function deleteItemInGeneralList(
  list,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem);
    l.splice(index, 1);
    updateDoc(docRef, { [list]: l });
  });
}

function incrementField(path, docId, key, inc) {
  const docRef = doc(db, path, docId);
  updateDoc(docRef, { [key]: increment(inc) });
}

async function updateItemInGeneralList(
  list,
  item,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem);
    l[index] = item;
    updateDoc(docRef, { [list]: l });
  });
}

async function updateTriggerWordInGeneralList(item) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()["triggerWords"];
    const foundWord = l.find((w) => w.text.english == item.text.english);

    const index = l.indexOf(foundWord);
    l[index] = item;
    updateDoc(docRef, { triggerWords: l });
  });
}

async function addItemToUserList(uid, list, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function addLootInFirestore(uid, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let lootObject = { ...snapshot.data()["loot"] };
    lootObject[item.type].push(item);
    updateDoc(docRef, { loot: lootObject });
  });
}

async function deleteItemInUserList(
  uid,
  list,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem);
    l.splice(index, 1);
    updateDoc(docRef, { [list]: l });
  });
}

async function updateItemInUserList(
  uid,
  list,
  item,
  identifier,
  identifierValue,
  toLowerCase = false
) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list] ?? [];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == identifierValue.toLowerCase()
        )
      : l.find((i) => i[identifier] == identifierValue);
    const index = l.indexOf(foundItem) ?? 0;
    l[index] = item;
    updateDoc(docRef, { [list]: l });
  });
}

function uploadImageToStorage(path, image, thenFunc) {
  const imageStorageRef = ref(storage, path + "/" + image.name);
  uploadBytes(imageStorageRef, image).then((snapshot) => {
    if (thenFunc != null) thenFunc(snapshot.metadata.fullPath);
  });
}

async function addCustomItemToUserList(uid, item, collection) {
  const userDocRef = doc(db, "users/", uid);
  const userDoc = await getDoc(userDocRef);
  var newList = [];
  if (userDoc.data()[collection] != null) {
    newList = [...userDoc.data()[collection], item];
  } else {
    newList = [item];
  }
  updateDoc(userDocRef, { [collection]: newList });
}

function getSuggestedStrains(category) {
  switch (category) {
    case "general":
      break;
    case "personal":
      break;
    case "All time":
      break;
  }
}

async function getFireItems(local, uid, setFireItems) {
  let localItems = local ?? [];
  const lootDocRef = doc(db, "general/", "fireItems");
  const lootDoc = await getDoc(lootDocRef);
  const items = lootDoc.data()["items"] ?? [];
  const spells = lootDoc.data()["spells"] ?? [];
  const creatures = lootDoc.data()["creatures"] ?? [];
  const buildings = lootDoc.data()["buildings"] ?? [];
  const events = lootDoc.data()["events"] ?? [];

  if (localItems.length < 1) {
    await getCustomUserList(uid, "fireItems", (firestoreItems) => {
      firestoreItems.forEach((i) => localItems.push(i));

      const localIds = localItems.map((i) => i.id);

      const list = items
        .concat(spells)
        .concat(creatures)
        .concat(buildings)
        .concat(events);
      for (let i = 0; i < list.length; i++) {
        let item = list[i];
        if (!localIds.includes(item.id)) localItems.push(item);
      }
      setFireItems(uid, localItems);
    });
  } else {
    setFireItems(uid, localItems);
  }
}

async function getCustomUserList(uid, collection, onCollectionRetrieved) {
  const userDocRef = doc(db, "users/", uid);
  await getDoc(userDocRef).then((doc) => {
    const list = doc.data()[collection];
    onCollectionRetrieved(list ?? []);
    return list ?? [];
  });
}

async function getUserLoot(uid, onListRetrieved) {
  const userDocRef = doc(db, "users/", uid);
  await getDoc(userDocRef).then((doc) => {
    const listObj = doc.data()["loot"];
    let list = (listObj["items"] ?? [])
      .concat(listObj["spells"] ?? [])
      .concat(listObj["buildings"] ?? [])
      .concat(listObj["events"] ?? [])
      .concat(listObj["creatures"] ?? []);
    onListRetrieved(list ?? []);
    return list ?? [];
  });
}

export {
  getUserLoot,
  addLootInFirestore,
  getCustomUserList,
  getFireItems,
  getSuggestedStrains,
  addCustomItemToUserList,
  updateItemInUserList,
  deleteItemInUserList,
  addItemToUserList,
  uploadImageToStorage,
  getInfoFromRawId,
  getSingleDocFromFirestore,
  updateDocInFirestore,
  getCollectionListener,
  setDocInFirestore,
  deleteDocInFirestore,
  getDocListener,
  addItemToGeneralList,
  updateItemInGeneralList,
  deleteItemInGeneralList,
  getGeneralList,
  getCollectionFromUserFirestore,
  incrementField,
  updateTriggerWordInGeneralList,
};
