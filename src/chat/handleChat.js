import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  collectionGroup,
} from "@firebase/firestore";
import db from "../firebase/fireInit";
import Turf from "../fire_classes/Turf";
import { setDocInFirestore } from "../misc/handleFirestore";
import { dateToTimestamp } from "../misc/helperFuncs";

function getChatListener(chat, onCollection) {
  const q = query(
    collectionGroup(db, "messages"),
    where("chats", "array-contains", chat)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    console.log("snapshot is - ", snapshot);
    let docs = [];
    snapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    console.log("docs are - ", docs);
    onCollection(docs, unsubscribe);
  });
  return unsubscribe;
}

async function checkIfTurfChatExists(chatName, uid, username) {
  let docRef = doc(db, "turfChats/", chatName.toLowerCase());
  await getDoc(docRef).then((d) => {
    if (d.data() == null) {
      const chatDocRef = doc(db, "turfChats/", chatName.toLowerCase());
      let chatDoc = makeChatDoc(chatName, uid, username);
      setDoc(chatDocRef, chatDoc);
    }
  });
}

function makeChatDoc(chatName, uid, username, chats) {
  return {
    id: chatName,
    created: dateToTimestamp(new Date()),
    createdBy: { id: uid, nick: username },
    turf: Turf(),
  };
}

function sendMessageToTurfChats(chat, msg) {
  setDocInFirestore("turfChats/" + chat + "/messages", msg.id, msg);
}

function getChatList(activeStrains) {
  const constellations = [];
  const chats = [];
  if (activeStrains.length > 2) {
    constellations.push([activeStrains[0], activeStrains[1], activeStrains[2]]);
    constellations.push([activeStrains[0], activeStrains[2]]);
    constellations.push([activeStrains[1], activeStrains[2]]);
    constellations.push([activeStrains[2]]);
  }
  if (activeStrains.length > 1) {
    constellations.push([activeStrains[0], activeStrains[1]]);
    constellations.push([activeStrains[1]]);
  }
  constellations.push([activeStrains[0]]);

  for (let i = 0; i < constellations.length; i++) {
    let constellation = constellations[i];
    chats.push(constellation.join("|").toLowerCase());
  }

  return chats;
}

export {
  getChatListener,
  checkIfTurfChatExists,
  getChatList,
  sendMessageToTurfChats,
};
