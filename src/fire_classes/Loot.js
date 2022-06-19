import { getRandomId } from "../misc/helperFuncs";

// types: Item, spell, creature, building, event, rares, uniques

export default class Loot {
  constructor(
    name = "",
    attributes = [],
    imgUrl,
    type = "",
    connectedString = "",
    fireItemId,
    message = null,
    id = getRandomId()
  ) {
    this.name = name;
    this.id = id;
    this.attributes = attributes;
    this.imgUrl = imgUrl;
    this.type = type;
    this.connectedString = connectedString;
    this.message = message;
    this.fireItemId = fireItemId;
  }

  toObj() {
    return {
      name: this.name,
      id: this.id,
      attributes: this.attributes,
      connectedString: this.connectedString,
      imgUrl: this.imgUrl,
      type: this.type,
      fireItemId: this.fireItemId,
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
    data.id,
    data.fireItemId
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
