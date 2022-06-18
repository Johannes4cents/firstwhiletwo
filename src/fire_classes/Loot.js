import { getRandomId } from "../misc/helperFuncs";

// types: Item, spell, creature, building, event, rares, uniques

export default class Loot {
  constructor(
    name = "",
    attributes = [],
    imgUrl,
    type = "",
    connectedString = "",
    snippet,
    story,
    snippetPart,
    spType,
    id = getRandomId(),
    kingdomItemId
  ) {
    this.name = name;
    this.id = id;
    this.attributes = attributes;
    this.imgUrl = imgUrl;
    this.type = type;
    this.story = story;
    this.connectedString = connectedString;
    this.snippet = snippet;
    this.snippetPart = snippetPart;
    this.spType = spType;
    this.kingdomItemId = kingdomItemId;
  }

  toObj() {
    return {
      name: this.name,
      id: this.id,
      attributes: this.attributes,
      imgUrl: this.imgUrl,
      type: this.type,
      story: this.story,
      snippet: this.snippet,
      connectedString: this.connectedString,
      snippetPart: this.snippetPart,
      spType: this.spType,
      kingdomItemId: this.kingdomItemId,
    };
  }
}

function docToLoot(data) {
  return new Loot(
    data.name,
    data.attributes,
    data.imgUrl,
    data.type,
    data.connectedString,
    data.snippet,
    data.story,
    data.snippetPart,
    data.spType,
    data.id,
    data.kingdomItemId
  );
}

function docsToLoot(list) {
  return list.map((i) => docToLoot(i)) ?? [];
}

const ressourceImages = {
  weapons: "/images/ressources/res_weapons.png",
  diplomacy: "/images/ressources/res_diplomacy.png",
  energy: "/images/ressources/res_energy.png",
  fear: "/images/ressources/res_fear.png",
  food: "/images/ressources/res_food.png",
  gold: "/images/ressources/res_gold.png",
  happiness: "/images/ressources/res_happiness.png",
  knowledge: "/images/ressources/res_knowledge.png",
  mana: "/images/ressources/res_mana.png",
  oil: "/images/ressources/res_oil.png",
  rage: "/images/ressources/res_rage.png",
  science: "/images/ressources/res_science.png",
  religion: "/images/ressources/res_religion.png",
};

export { docsToLoot, ressourceImages };
