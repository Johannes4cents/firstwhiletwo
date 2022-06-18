import { getItemById } from "../../misc/helperFuncs";

const fireItem = (
  id,
  nameEntered,
  phrases,
  chance,
  imgUrl,
  attributes,
  stealProtection,
  type,
  hints,
  genres,
  upvotes,
  steppingStones,
  multiPhrases
) => {
  return {
    id: id ?? null,
    name: nameEntered ?? { german: "", english: "" },
    phrases: phrases ?? { german: [], english: [] },
    chance: chance ?? 0,
    imgUrl: imgUrl ?? "/images/loot/items/item_unknown.png",
    attributes: attributes ?? [],
    stealProtection: stealProtection ?? { from: 0, till: 0 },
    type: type ?? "items",
    hints: hints ?? { german: [], english: [] },
    genres: genres ?? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    upvotes: upvotes ?? [],
    steppingStones: steppingStones ?? [],
    multiPhrases: multiPhrases ?? { german: [], english: [] },
    firstFound: null,
  };
};

export default fireItem;
