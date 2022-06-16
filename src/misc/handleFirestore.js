import { async } from "@firebase/util";
import {
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

async function addItemToUserList(uid, list, item) {
  const docRef = doc(db, "users/", uid);
  await getDoc(docRef).then((snapshot) => {
    let l = snapshot.data()[list];
    l.push(item);
    updateDoc(docRef, { [list]: l });
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

function uploadImageToStorage(path, image, thenFunc) {
  const imageStorageRef = ref(storage, path + "/" + image.name);
  uploadBytes(imageStorageRef, image).then((snapshot) => {
    if (thenFunc != null) thenFunc(snapshot.metadata.fullPath);
  });
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

export {
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
};
