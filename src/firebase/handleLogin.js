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
    ressources: {
      cash: { amount: 0 },
      mana: { amount: 0 },
      oil: { amount: 0 },
      food: { amount: 0 },
      weapons: { amount: 0 },
      diplomacy: { amount: 0 },
      energy: { amount: 0 },
      fear: { amount: 0 },
      happiness: { amount: 0 },
      knowledge: { amount: 0 },
      rage: { amount: 0 },
      science: { amount: 0 },
    },
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
    dropChances: {
      mana: 40,
      oil: 40,
      food: 40,
      weapons: 40,
      diplomacy: 40,
      energy: 40,
      fear: 40,
      happiness: 40,
      knowledge: 40,
      rage: 40,
      science: 40,
    },
  };
  // set Info object in Firestore
  const docRef = doc(db, "users/", uid);
  setDoc(docRef, infoObj);

  // set Info in localStorage
  localStorage.setItem("info", JSON.stringify(infoObj));

  // setState of info
  setInfo(infoObj);
}

const onInfoFound = (foundInfo, setInfo) => {
  // setState of Info
  let newInfo = { ...foundInfo, loggedIn: true };
  setInfo(newInfo);
};

export { createNewUserInFirestore, onInfoFound };
