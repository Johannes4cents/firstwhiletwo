import {
  addItemToGeneralList,
  getGeneralList,
  setDocInFirestore,
} from "../misc/handleFirestore";
import { getRandomId } from "../misc/helperFuncs";

export default function Strain(id, text) {
  return {
    id,
    text,
  };
}

function makeStrain(uid, strainText, addMyStrain, addRemoveStrainWord) {
  getGeneralList("strainWords", (strains) => {
    const strain = strains.find(
      (s) => s.text.toLowerCase() == strainText.toLowerCase()
    );
    if (strain == null) {
      strain = Strain(getRandomId(), strainText);
      addItemToGeneralList("strainWords", strain);
      setDocInFirestore("strains/", strain.id, strain);
      addRemoveStrainWord(uid, strain);
    }
    addMyStrain(uid, strain);
    setDocInFirestore("users/" + uid + "/myStrains", strain.id, strain);
  });
}

export { makeStrain };
