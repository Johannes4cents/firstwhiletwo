import {
  addItemToGeneralList,
  getGeneralList,
  getSingleDocFromFirestore,
  setDocInFirestore,
} from "../misc/handleFirestore";

export default function Strain(id, faction, school) {
  return {
    id,
    faction,
    school,
    special: false,
    conditions: [],
  };
}

function makeStrain(uid, strainText, addMyStrain, changeSuggestedStrains) {
  getSingleDocFromFirestore("strains", strainText.toLowerCase(), (doc) => {
    console.log("doc is - ", doc);
    if (!doc) {
      const strain = Strain(strainText.toLowerCase());
      changeSuggestedStrains(uid, strain);
      addMyStrain(uid, strain);
      setDocInFirestore("strains/", strain.id, strain);
    }
  });
}

export { makeStrain };
