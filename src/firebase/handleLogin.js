import { doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase/fireInit";
import { getRandomId } from "../misc/helperFuncs";

function createNewUserInFirestore(rawId, setInfo) {
  // new User, localStorage info was null, fireStore info was null
  // create info object
  const uid = getRandomId();
  let infoObj = {
    rawId,
    nickname: "Pick a Nickname",
    uid: uid,
    admin: false,
    profilePicUrl: null,
    ressources: {
      cash: { amount: 0, dropChance: 40 },
      mana: { amount: 0, dropChance: 40 },
      oil: { amount: 0, dropChance: 40 },
      food: { amount: 0, dropChance: 40 },
      weapons: { amount: 0, dropChance: 40 },
      diplomacy: { amount: 0, dropChance: 40 },
      energy: { amount: 0, dropChance: 40 },
      fear: { amount: 0, dropChance: 40 },
      happiness: { amount: 0, dropChance: 40 },
      knowledge: { amount: 0, dropChance: 40 },
      rage: { amount: 0, dropChance: 40 },
      science: { amount: 0, dropChance: 40 },
      religion: { amount: 0, dropChance: 40 },
      health: { amount: 0, dropChance: 40 },
      love: { amount: 0, dropChance: 40 },
    },
    specialRessources: [],
    dismissedStrains: [],
    loot: {
      spells: [],
      buildings: [],
      items: [],
      creatures: [],
    },
    hero: { name: "" },
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
