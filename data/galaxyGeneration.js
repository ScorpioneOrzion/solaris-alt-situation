
export default function generateLocations(playerCount) {
  let layer = 1;
  let current = 0;
  let locations = [];
  let layers = [];

  for (let i = 0; i < playerCount; i++) {
    let max = Math.pow(layer, 2) * 2;
    locations.push({ layer, current })
    layers.push(layer)
    current += 1;
    if (current >= max) {
      layer += 1;
      current = 0;
    }
  }

  if (locations.filter(value => value.layer === Math.max(...layers).length) <= 2) {
    locations = locations.map(value => { return value.layer === Math.max(...layers) ? { current: value.current + 2 , layer: 1 } : value })
  }

  return locations.map((a, _, b) => { return { angle: Math.PI * 2 * a.current / b.filter(c => c.layer === a.layer).length, distance: a.layer } });
}