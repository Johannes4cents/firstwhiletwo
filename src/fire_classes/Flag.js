import { getRandomId } from "../misc/helperFuncs";

export default class Flag {
  constructor(
    questiobObj,
    affirmativeStatementObj,
    negativeStatement,
    id,
    customRessources
  ) {
    this.id = id ?? getRandomId();
    this.question = questiobObj ?? {
      english: "",
      german: "",
    };
    this.affirmativeStatement = affirmativeStatementObj ?? {
      english: "",
      german: "",
    };
    this.negativeStatement = negativeStatement ?? { english: "", german: "" };
    this.customRessources = customRessources;
  }
}

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
