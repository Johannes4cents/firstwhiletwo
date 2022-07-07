import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  collectionGroup,
  getDocs,
} from "@firebase/firestore";
import db from "../firebase/fireInit";
import Turf from "../fire_classes/Turf";
import { setDocInFirestore } from "../misc/handleFirestore";
import { dateToTimestamp, forArrayLength } from "../misc/helperFuncs";

function getChatListener(chat, onCollection) {
  const q = query(
    collectionGroup(db, "messages"),
    where("chats", "array-contains", chat)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    let docs = [];
    snapshot.forEach((doc) => {
      docs.push(doc.data());
    });
    onCollection(docs, unsubscribe);
  });
  return unsubscribe;
}

async function getChatMessage(id, onRetrieved) {
  const q = query(collectionGroup(db, "messages"), where("id", "==", id));
  getDocs(q).then((snapshot) => {
    var message = null;
    snapshot.forEach((doc) => {
      message = doc.data();
    });
    onRetrieved(message);
  });
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
    currentUser: [],
  };
}

function checkMessagesForUpdate(messages, updateMessage) {
  forArrayLength(messages, (message) => {
    getChatMessage(message.id, (msg) => {
      updateMessage(msg);
    });
  });
}

function sendMessageToTurfChats(chat, msg) {
  msg.collection = "turfChats/" + chat + "/messages";
  setDocInFirestore("turfChats/" + chat + "/messages", msg.id, msg);
}

function checkCorrectChatDepth(levels, activeStrains) {
  let activeAmount = activeStrains.length;
  let schools = ["top_left", "bottom_left", "bottom_left", "bottom_right"];
  var state = true;
  function checkSchools(school) {
    let amount = activeStrains.filter((s) => s.school == school).length;
    if (levels[school].depth > activeAmount) {
      if (amount < levels[school].depth && amount != 0) state = false;
    }
  }

  forArrayLength(schools, (school) => {
    const schoolCheck = checkSchools(school);
    if (schoolCheck) return schoolCheck;
  });

  return activeAmount > 0 ? state : false;
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
  checkCorrectChatDepth,
  getChatListener,
  checkIfTurfChatExists,
  getChatList,
  sendMessageToTurfChats,
  checkMessagesForUpdate,
  getChatMessage,
};
