import Star from "./star.js";
import { Lehmner32 } from "./lehmner32.js";

const starCount = 60
const playerCount = 2
const tau = 2.0 * Math.PI;

function generateLocations() {
  let locations = [];
  let seed = Number((Math.random() * 1e8).toFixed(0))
  const rng = Lehmner32(seed)

  let currentRadius = 50;
  let radiusStep = 50;
  let maxTries = 2;
  let sectorAngle = tau / playerCount;

  do {
    let createdLocations = false;

    for (let i = 0; i < maxTries; i++) {
      let candidateLocations = [];
      let baseLocation = generateStarPositionInSector(currentRadius, rng)
      let locationRejected = false;

      for (let sectorIndex = 0; sectorIndex < playerCount; sectorIndex++) {
        let location = { ...baseLocation, angle: baseLocation.angle + sectorAngle * sectorIndex }
      }
    }
  } while (locations.length < starCount)
}

function generateStarPositionInSector(currentRadius, rng) {
  let angle = rng.random() * (tau / playerCount);
  let distance = currentRadius / 2.0 + rng.next().value * (currentRadius * 2.0);

  return {
    angle, distance, linked: false
  };
}

function isLocationTooCloseToOthers(location, locations) {
  let ls = new Star(location.angle, location.distance)
  return locations.find(l => {
    let lss = new Star(l.angle, l.distance)
    return ls.distanceTo(lss) < 50;
  }) != null
}
