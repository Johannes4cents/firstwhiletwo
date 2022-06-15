import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import db from "../firebase/fireInit";
import Turf from "../fire_classes/Turf";
import { setDocInFirestore } from "../misc/handleFirestore";
import { dateToTimestamp } from "../misc/helperFuncs";

function getChatListener(chat, onCollection) {
  const collectionRef = collection(db, "turfChats/" + chat + "/messages");
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    let items = [];
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    onCollection(items, unsubscribe);
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

function makeChatDoc(chatName, uid, username) {
  return {
    id: chatName,
    created: dateToTimestamp(new Date()),
    createdBy: { id: uid, nick: username },
    turf: Turf(),
  };
}

function sendMessageToTurfChats(chats, msg) {
  for (let i = 0; i < chats.length; i++) {
    const chat = chats[i];
    setDocInFirestore("turfChats/" + chat + "/messages", msg.id, msg);
  }
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
