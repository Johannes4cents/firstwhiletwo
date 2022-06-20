import { getItemById } from "../../misc/helperFuncs";

const fireItem = (
  id,
  nameEntered,
  triggerWords,
  chance,
  imgUrl,
  attributes,
  stealProtection,
  type,
  hints,
  upvotes,
  steppingStones,
  multiPhrases,
  baseItem = null
) => {
  return {
    id: id ?? null,
    name: nameEntered ?? { german: "", english: "" },
    triggerWords: triggerWords ?? [],
    chance: chance ?? 0,
    imgUrl: imgUrl ?? "",
    attributes: attributes ?? [],
    stealProtection: stealProtection ?? { from: 0, till: 0 },
    type: type ?? "items",
    hints: hints ?? { german: [], english: [] },
    upvotes: upvotes ?? [],
    steppingStones: steppingStones ?? [],
    multiPhrases: multiPhrases ?? { german: [], english: [] },
    firstFound: null,
    baseItem,
  };
};

export default fireItem;
