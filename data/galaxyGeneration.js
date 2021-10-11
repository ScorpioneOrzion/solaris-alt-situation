import Star from "./star.js";

export function generateLocations(playerCount) {
  let layer = 1;
  let current = 0;
  const locations = [];

  for (let i = 0; i < playerCount; i++) {
    let max = Math.pow(layer, 2) * 2;
    locations.push({ layer, current })
    current += 1;
    if (current >= max) {
      layer += 1;
      current = 0;
    }
  }
  return locations.map((a, _, b) => { return { angle: Math.PI * 2 * a.current / b.filter(c => c.layer === a.layer).length, distance: a.layer } });
}