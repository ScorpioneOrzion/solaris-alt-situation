import Star from "./star.js";
import { Lehmner32 } from "./lehmner32.js";

const starCount = 60
const playerCount = 2
const tau = 2.0 * Math.PI;

function generateLocations() {
  /** @type {{angle:number, distance:number, linked:boolean}[]} */
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
      /** @type {{angle:number, distance:number, linked:boolean}[]} */
      let candidateLocations = [];
      let baseLocation = generateStarPositionInSector(currentRadius, rng)
      let locationRejected = false;

      for (let sectorIndex = 0; sectorIndex < playerCount; sectorIndex++) {
        let location = { ...baseLocation, angle: baseLocation.angle + sectorAngle * sectorIndex }
        if (isLocationTooCloseToOthers(location, locations) ||
          isLocationTooCloseToOthers(location, candidateLocations)) {
          locationRejected = true;
          break;
        }
      }

      if (locationRejected) { continue; }

      locations.push(...candidateLocations);
      createdLocations = true;
      break;
    }

    if (!createdLocations)
      currentRadius += radiusStep;
  } while (locations.length < starCount);

  const distanceFromCenter = getGalaxyDiameter(locations).x / 4;
  let playerAngle = sectorAngle / 2;
  let disiredLocation = { distance: distanceFromCenter, angle: playerAngle }
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
    return ls.distanceTo(lss) < 30;
  }) != null
}

function getGalaxyDiameter(locations) {
  let xArray = locations.map((location) => { return location.x; });
  let yArray = locations.map((location) => { return location.y; });

  let maxX = Math.max(...xArray);
  let maxY = Math.max(...yArray);

  let minX = Math.min(...xArray);
  let minY = Math.min(...yArray);

  return {
    x: maxX - minX,
    y: maxY - minY
  };
}