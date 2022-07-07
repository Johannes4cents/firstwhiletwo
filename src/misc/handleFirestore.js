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
  collectionGroup,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import db, { storage, functions } from "../firebase/fireInit";
import { httpsCallable } from "firebase/functions";
import { forArrayLength } from "./helperFuncs";

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

async function queryCollectionGroup(group, field, operator, value) {
  const colGroupRef = collectionGroup(db, group);
  let q = query(colGroupRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  let docs = [];
  snapshot.forEach((d) => {
    docs.push(d.data());
  });
  return docs;
}

async function queryCollection(col, field, operator, value, onResult) {
  const colRef = collection(db, col);
  let q = query(colRef, where(field, operator, value));
  const snapshot = await getDocs(q);
  let docs = [];
  snapshot.forEach((d) => {
    docs.push(d.data());
  });
  if (onResult) onResult(docs);
  return docs;
}

async function multiQueryCollection(col, queries, onResult) {
  let qList = [];
  forArrayLength(queries, (query) => {
    qList.push(where(query[0], query[1], query[2]));
  });
  const colRef = collection(db, col);
  let q = query(colRef, ...qList);
  const snapshot = await getDocs(q);
  let docs = [];
  snapshot.forEach((d) => {
    docs.push(d.data());
  });
  if (onResult) onResult(docs);
  return docs;
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

async function getDocListener(col, id, onChange) {
  console.log("col - ", col, " | id - ", id);
  const docRef = doc(db, col, id);
  let unsubscribe = onSnapshot(docRef, (doc) => {
    console.log("doc - ", doc);
    onChange(doc.data());
  });
  return unsubscribe;
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
    let l = snapshot.data()[list] ?? [];
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
  console.log("path - ", path, " | key - ", key, " | inc - ", inc);
  updateDoc(docRef, { [key]: increment(inc) });
}

async function updateItemInGeneralList(
  list,
  item,
  identifier,
  toLowerCase = false
) {
  const docRef = doc(db, "general", "lists");
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list] ?? [];
    const foundItem = toLowerCase
      ? l.find(
          (i) => i[identifier].toLowerCase() == item[identifier].toLowerCase()
        )
      : l.find((i) => i[identifier] == item[identifier]);
    const index = l.indexOf(foundItem);
    if (foundItem) l[index] = item;
    else l.push(item);
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
    let l = snapshot.data()[list] ?? [];
    l.push(item);
    updateDoc(docRef, { [list]: l });
  });
}

async function addLootInFirestore(uid, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let lootArray = snapshot.data()["loot"];
    lootArray.push(item);
    updateDoc(docRef, { loot: lootArray });
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

async function updateLootItemInUserList(uid, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let lootObj = snapshot.data().loot ?? {};

    let newList = [...lootObj[item.type]];
    let index = newList.map((i) => i.d).indexOf(item.id);
    newList[index] = item;

    lootObj[item.type] = newList;
    console.log("lootObj  - ", lootObj);
    updateDoc(docRef, { loot: lootObj });
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

async function getGeneralStuff(local, uid, setFireItems, setSuggestedStrains) {
  let localItems = local ?? [];
  const lootDocRef = doc(db, "general/", "fireItems");
  const listsDocRef = doc(db, "general", "lists");
  const listsDoc = await getDoc(listsDocRef);
  const lootDoc = await getDoc(lootDocRef);
  const items = lootDoc.data()["items"] ?? [];
  const spells = lootDoc.data()["spells"] ?? [];
  const creatures = lootDoc.data()["creatures"] ?? [];
  const buildings = lootDoc.data()["buildings"] ?? [];
  const events = lootDoc.data()["events"] ?? [];

  // get resWords and transform them to multiple string objects
  const resWords = listsDoc.data()["resWords"];
  const allStrings = [];
  forArrayLength(resWords, (word) => {
    let combinedList = word.texts.english.concat(word.texts.german);
    forArrayLength(combinedList, (string) => {
      let stringObj = {
        string,
        weight: word.weight,
        id: word.id,
        maxOccurences: word.maxOccurences,
        ressource: word.ressource,
      };
      allStrings.push(stringObj);
    });
  });

  // setSuggestedStrains
  setSuggestedStrains(uid, listsDoc.data()["strainList"]);

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
      setFireItems(uid, localItems, allStrings);
    });
  } else {
    setFireItems(uid, localItems, allStrings);
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
    console.log("users - ", doc.data());
    const lootList = doc.data()["loot"];

    onListRetrieved(lootList ?? []);
    return lootList ?? [];
  });
}

async function getBaseCollection(col, onRetrieved) {
  const colRef = collection(db, col);
  await getDocs(colRef).then((docs) => {
    const list = [];
    docs.forEach((doc) => {
      list.push(doc.data());
    });
    onRetrieved(list);
  });
}

function getCreateUserListener(col, identifier, operator, value, onRetrieved) {
  const collectionRef = collection(db, col);
  const q = query(collectionRef, where(identifier, operator, value));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    var info = null;
    snapshot.forEach((doc) => {
      info = doc.data();
    });
    onRetrieved(unsubscribe, info);
  });
}

function cloudFunc(name, data, onResult, onError) {
  const func = httpsCallable(functions, name);
  func(data)
    .then((result) => {
      onResult(result);
    })
    .catch((error) => {
      onError(error);
    });
}

async function getUser(uid, onUser) {
  let userRef = doc(db, "users/", uid);
  let userDoc = await getDoc(userRef);
  onUser(userDoc.data());
}

function getUserListsOnStartUp(uid, lists) {
  var userDoc = null;

  forArrayLength(lists, (list) => {
    let localList = JSON.parse(localStorage.getItem(uid + list.list));
    if (localList != null) list.set(uid, localList);
    else {
      if (userDoc) list.set(uid, userDoc[list.list]);
      else {
        getUser(uid, (user) => {
          console.log("user - ", user);
          userDoc = user;
          list.set(uid, userDoc[list.list]);
        });
      }
    }
  });
}

async function fireAnswersToExtended(uid, setMyAnswers) {
  let listsRef = doc(db, "general", "lists");
  let lists = await getDoc(listsRef);
  let fireFlags = lists.data()["fireFlags"];

  let userRef = doc(db, "users", uid);
  let user = await getDoc(userRef);
  const statements = user.data()["statements"];

  console.log("fireFlags - ", fireFlags, " | statements - ", statements);
  let fixedAnswers = [];
  forArrayLength(statements, (answer) => {
    const fa = {};
    fa.statement = answer.statement;
    fa.answered = new Date().getTime();
    fa.private = answer.private;
    fa.importance = answer.importance;
    fa.statement = fireFlags
      .find((f) => f.id == answer.statement.flagId)
      .statements.find((s) => s.id == answer.statement.statement);
    fixedAnswers.push(fa);
  });
  localStorage.setItem(uid + "myAnswers", JSON.stringify(fixedAnswers));
  setMyAnswers(uid, fixedAnswers);
}

export {
  fireAnswersToExtended,
  getUserListsOnStartUp,
  cloudFunc,
  multiQueryCollection,
  queryCollectionGroup,
  queryCollection,
  getCreateUserListener,
  getBaseCollection,
  updateLootItemInUserList,
  getUserLoot,
  addLootInFirestore,
  getCustomUserList,
  getGeneralStuff,
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
