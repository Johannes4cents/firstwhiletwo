import { capitalize, getNumberInBetweenRange } from "../helperFuncs";
import FireItemAttribute from "../other_classes/FireItemAttribute";

const path = "/images/loot/items/attributes/";
const fireItemAttributes = [
  new FireItemAttribute(
    "givesGold",
    "/images/loot/effects/icon_gold.png",
    2,
    1,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "givesMana",
    "/images/loot/effects/icon_mana.png",
    2,
    2,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "overTime",
    "/images/loot/effects/icon_over_time.png",
    2,
    3,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "hasDuration",
    "/images/loot/effects/icon_over_time.png",
    2,
    4,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "hasAttack",
    "/images/loot/effects/icon_attack.png",
    4,
    5,
    1000,
    (minDmg, maxDmg, ranged, dmgType) => {
      let dmg = getNumberInBetweenRange(minDmg, maxDmg);
      const images = {
        arrow: path + "attack_arrow.png",
        steel: path + "attack_steel.png",
      };
      const attribute = {
        name: `${capitalize(dmgType)} attack `,
        imgUrl: path + `attack_${dmgType}.png`,
        attack: { damage: dmg, ranged, dmgType },
      };
      return attribute;
    }
  ),
  new FireItemAttribute(
    "givesProtection",
    "/images/loot/effects/icon_has_protection.png",
    3,
    6,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute("isSet", "/images/loot/effects/icon_is_set.png", 1, 7),
  new FireItemAttribute("givesLuck", "/images/loot/icon_chance.png", 2, 8),
  new FireItemAttribute(
    "hasUpkeep",
    "/images/loot/effects/icon_has_upkeep.png",
    4,
    9,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "isRare",
    "/images/loot/effects/icon_rare.png",
    0,
    11,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "isUnique",
    "/images/loot/effects/icon_unique.png",
    1,
    12,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "isMedival",
    "/images/loot/effects/icon_is_medival.png",
    0,
    13,
    1000,
    () => {
      let attribute = {
        name: "is Medival",
        imgUrl: path + "icon_medival.png",
      };
      return attribute;
    }
  ),
  new FireItemAttribute(
    "isSciFi",
    "/images/loot/effects/icon_is_scifi.png",
    0,
    14,
    1000,
    () => {
      const attribute = {};
      return attribute;
    }
  ),
  new FireItemAttribute(
    "hasHp",
    "/images/loot/effects/icon_has_health.png",
    2,
    15,
    1000,
    (minHealth, maxHealth) => {
      let health = getNumberInBetweenRange(minHealth, maxHealth);
      let attribute = {
        name: (currentHealth, health) => {
          return `Has ${currentHealth}/${health} Hp`;
        },
        currentHealth: health,
        health,
        receiveDmg: (currentHealth, dmgObject, resistances) => {
          return currentHealth - dmgObject.damage;
        },
        imgUrl: path + "icon_health.png",
      };
      return attribute;
    }
  ),
  new FireItemAttribute(
    "hasLevels",
    "/images/loot/effects/icon_levels.png",
    2,
    16,
    1000,
    (minLevel, maxLevel) => {
      let level = getNumberInBetweenRange(minLevel, maxLevel);
      let attribute = {
        name: (currentLevel) => {
          return `Current Level: ${currentLevel}`;
        },
        currentLevel: level,
        xp: 0,
        nextLevel: 100,
        imgUrl: path + "icon_levels",
        upgradeLevel: () => {},
      };
      return attribute;
    }
  ),
];

export { fireItemAttributes };
