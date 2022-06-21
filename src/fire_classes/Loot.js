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
    upvotes = ["cash"],
    message = null,
    attached = null,
    id = getRandomId(),
    locked = true
  ) {
    this.name = name;
    this.id = id;
    this.attributes = attributes;
    this.connectedString = connectedString;
    this.imgUrl = imgUrl;
    this.type = type;
    this.message = message;
    this.fireItemId = fireItemId;
    this.upvotes = upvotes;
    this.locked = locked;
    this.attached = attached;
  }

  toObj() {
    return {
      name: this.name,
      id: this.id,
      attributes: this.attributes,
      connectedString: this.connectedString,
      imgUrl: this.imgUrl,
      type: this.type,
      message: this.message,
      fireItemId: this.fireItemId,
      upvotes: this.upvotes,
      locked: this.locked,
      attached: this.attached,
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
    data.fireItemId,
    data.upvotes,
    data.message,
    data.attached,
    data.id,
    data.locked
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
