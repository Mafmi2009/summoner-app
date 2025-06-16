import { Demon, Region } from "./types";

// Assign weights for rarity terms
const RARITY_WEIGHTS: Record<string, number> = {
  "Very Common": 1.0,
  "Common": 0.6,
  "Uncommon": 0.3,
  "Rare": 0.1,
  "Very Rare": 0.04,
  "Endangered": 0.01,
  "Extinct": 0.0 // not summonable
};

function levelWeight(level: number): number {
  return 1 / Math.pow(level, 1.1);
}

export function summonDemon(
  demons: Demon[],
  region: Region,
  pityCounter: number
): Demon {
  const availableDemons = demons.filter(
    (d) => RARITY_WEIGHTS[d.realmRarity[region]] > 0
  );

  const demonWeights = availableDemons.map((d) => {
    let base =
      levelWeight(d.level) *
      (RARITY_WEIGHTS[d.realmRarity[region]] || 0.01);

    if (pityCounter >= 10 && d.level >= 5) {
      base *= 1.5;
    }
    return base;
  });

  const total = demonWeights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < availableDemons.length; i++) {
    r -= demonWeights[i];
    if (r <= 0) {
      return availableDemons[i];
    }
  }
  return availableDemons[0];
}