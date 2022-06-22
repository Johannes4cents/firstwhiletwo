import {
  addItemToGeneralList,
  getGeneralList,
  getSingleDocFromFirestore,
  setDocInFirestore,
} from "../misc/handleFirestore";
import { getRandomId } from "../misc/helperFuncs";

export default function Strain(id, factions) {
  return {
    id,
    factions,
  };
}

function makeStrain(uid, strainText, addMyStrain, addRemoveStrainWord) {
  getSingleDocFromFirestore("strains", strainText.toLowerCase(), (doc) => {
    console.log("doc is - ", doc);
    if (!doc) {
      const strain = Strain(strainText.toLowerCase());
      addRemoveStrainWord(uid, strain);
      addMyStrain(uid, strain);
      setDocInFirestore("strains/", strain.id, strain);
    }
  });
}

export { makeStrain };
