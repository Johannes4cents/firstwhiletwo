import { doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/fireInit";
import { getRandomId } from "../misc/helperFuncs";

function createNewUserInFirestore(rawId, setInfo) {
  // new User, localStorage info was null, fireStore info was null
  // create info object
  const uid = getRandomId();
  let infoObj = {
    language: "english",
    rawId,
    nickname: "none",
    uid: uid,
    admin: false,
    profilePicUrl: null,
    ressources: {
      cash: { amount: 0, dropChance: 100 },
      mana: { amount: 0, dropChance: 100 },
      oil: { amount: 0, dropChance: 100 },
      food: { amount: 0, dropChance: 100 },
      weapons: { amount: 0, dropChance: 100 },
      diplomacy: { amount: 0, dropChance: 100 },
      energy: { amount: 0, dropChance: 100 },
      fear: { amount: 0, dropChance: 100 },
      happiness: { amount: 0, dropChance: 100 },
      knowledge: { amount: 0, dropChance: 100 },
      rage: { amount: 0, dropChance: 100 },
      science: { amount: 0, dropChance: 100 },
      religion: { amount: 0, dropChance: 100 },
      health: { amount: 0, dropChance: 100 },
      love: { amount: 0, dropChance: 100 },
    },
    specialRessources: [],
    dismissedStrains: [],
    fireItems: {
      spells: [],
      buildings: [],
      items: [],
      creatures: [],
    },
    myGuy: { name: "", gender: "male" },
    answeredQuestions: [],
    reputation: [],
    stats: {
      levels: { rightWinged: 1, leftWinged: 1 },
    },
  };
  // set Info object in Firestore
  const docRef = doc(db, "users/", uid);
  setDoc(docRef, infoObj);

  // setState of info
  setInfo(infoObj);
}

const onInfoFound = (foundInfo, setInfo) => {
  // setState of Info
  let newInfo = { ...foundInfo, loggedIn: true };
  setInfo(newInfo);
};

export { createNewUserInFirestore, onInfoFound };
