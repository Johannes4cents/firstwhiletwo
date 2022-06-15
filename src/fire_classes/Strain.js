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
      const strain = Strain(getRandomId(), strainText);
      addItemToGeneralList("strainWords", strain);
      addMyStrain(uid, strain);
      setDocInFirestore("strains/", strain.id, strain);
      setDocInFirestore("users/" + uid + "/myStrains", strain.id, strain);
      addRemoveStrainWord(uid, strain);
    } else {
      console.log("strain is already there");
      alert("user should not see this: strain is already there");
    }
  });
}

export { makeStrain };
