import LootAttribute from "./LootAttribute";

const specialAttributes = [
  new LootAttribute(
    "scalesWithUpvotes",
    "/images/loot/effects/icon_levels.png",
    0,
    17,
    100,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new LootAttribute(
    "hasUniqueName",
    "/images/drawable/icon_word.png",
    0,
    18,
    150,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new LootAttribute(
    "givesExtraGold",
    "/images/loot/effects/icon_gold.png",
    2,
    19,
    150,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new LootAttribute(
    "givesExtraMana",
    "/images/loot/effects/icon_mana.png",
    2,
    20,
    200,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new LootAttribute(
    "makesBonusDamage",
    "/images/loot/effects/icon_attack.png",
    4,
    21,
    200,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new LootAttribute(
    "hasSpecialRssrc",
    "/images/loot/items/item_unknown.png",
    3,
    22,
    200,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
];

export { specialAttributes };
