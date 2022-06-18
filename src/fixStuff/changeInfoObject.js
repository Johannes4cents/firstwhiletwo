import { setDocInFirestore } from "../misc/handleFirestore";

export default function changeInfoObject(info, setInfo) {
  const newInfo = {
    ...info,
    ressources: {
      cash: { amount: 0, dropChance: 40 },
      mana: { amount: 0, dropChance: 40 },
      oil: { amount: 0, dropChance: 40 },
      food: { amount: 0, dropChance: 40 },
      weapons: { amount: 0, dropChance: 40 },
      diplomacy: { amount: 0, dropChance: 40 },
      energy: { amount: 0, dropChance: 40 },
      fear: { amount: 0, dropChance: 40 },
      happiness: { amount: 0, dropChance: 40 },
      knowledge: { amount: 0, dropChance: 40 },
      rage: { amount: 0, dropChance: 40 },
      science: { amount: 0, dropChance: 40 },
      religion: { amount: 0, dropChance: 40 },
      health: { amount: 0, dropChance: 40 },
      love: { amount: 0, dropChance: 40 },
    },
  };
  delete newInfo.dropChances;

  setInfo(newInfo);
  setDocInFirestore("users/", info.uid, newInfo);
}
