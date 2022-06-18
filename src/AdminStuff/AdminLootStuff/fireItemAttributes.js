import { capitalize, getNumberInBetweenRange } from "../../misc/helperFuncs";
import LootAttribute from "./LootAttribute";

const path = "/images/loot/items/attributes/";

const fireItemAttributes = [
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
        imgUrl: images[dmgType],
        attack: (target) => {
          target.receivesAttack({ damage: dmg, ranged, dmgType });
        },
      };
      return attribute;
    }
  ),
  new LootAttribute(
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
  new LootAttribute("isSet", "/images/loot/effects/icon_is_set.png", 1, 7),
  new LootAttribute("givesLuck", "/images/loot/icon_chance.png", 2, 8),
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
  new LootAttribute(
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
