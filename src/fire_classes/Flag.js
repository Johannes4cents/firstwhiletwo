import { getRandomId } from "../misc/helperFuncs";

function makeFireFlag() {
  const id = getRandomId();
  return {
    id,
    question: {
      english: "",
      german: "",
    },
    statements: [makeStatement(id), makeStatement(id)],
    color: "blue",
    category: "politics",
    answer: "",
  };
}

function makeStatement(flagId) {
  return {
    id: getRandomId(),
    text: { english: "", german: "" },
    ressources: [],
    supporter: [],
    hoistedUsers: [],
    hoistedTurfs: [],
    specialRessources: [],
    flagId,
  };
}

function makeSpecialRessource() {
  return {
    name: "",
    id: getRandomId(),
    imgUrl: "",
    statements: [],
  };
}

export { makeFireFlag, makeStatement, makeSpecialRessource };
