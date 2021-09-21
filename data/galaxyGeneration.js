import Star from "./star.js";
import { Lehmner32 } from "./lehmner32.js";

export function generateLocations(starCount, playerCount, minResource, maxResource) {
  /** @type {{angle:number, distance:number, linked:boolean, homeStar:boolean, resources:number, linkedLocations:Array}[]} */
  let locations = [];
  let seed = Number((Math.random() * 1e8).toFixed(0))
  const rng = Lehmner32(seed)
  const tau = 2.0 * Math.PI;

  let currentRadius = 50;
  let radiusStep = 50;
  let maxTries = 2;
  let sectorAngle = tau / playerCount;

  do {
    let createdLocations = false;

    for (let i = 0; i < maxTries; i++) {
      /** @type {{angle:number, distance:number, linked:boolean, homeStar:boolean}[]} */
      let candidateLocations = [];
      let baseLocation = generateStarPositionInSector(currentRadius, playerCount, rng)
      let locationRejected = false;

      for (let sectorIndex = 0; sectorIndex < playerCount; sectorIndex++) {
        let location = { ...baseLocation, angle: baseLocation.angle + sectorAngle * sectorIndex }
        if (isLocationTooCloseToOthers(location, locations) ||
          isLocationTooCloseToOthers(location, candidateLocations)) {
          locationRejected = true;
          break;
        }

        candidateLocations.push(location)
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
  let desiredLocation = { distance: distanceFromCenter, angle: playerAngle }
  let firstHomeLocation = getClosestLocation(desiredLocation, locations)
  let firstHomeLocationIndex = locations.indexOf(firstHomeLocation)

  for (let i = 0; i < playerCount; i++) {
    let locationIndex = firstHomeLocationIndex + i
    locations[locationIndex].homeStar = true;
  }

  let homeLocations = locations.filter(location => location.homeStar)
  let startingStarsCount = 4

  for (let homeLocation of homeLocations) {
    homeLocation.linkedLocations = []
  }

  let unlinkedLocations = locations.filter(location => !location.homeStar)
  while (startingStarsCount--) {
    for (let homeLocation of homeLocations) {
      let closestUnlinkedLocation = getClosestLocation(homeLocation, unlinkedLocations)
      homeLocation.linkedLocations.push(closestUnlinkedLocation)
      closestUnlinkedLocation.linked = true
      unlinkedLocations = unlinkedLocations.filter(location => location !== closestUnlinkedLocation)
    }
  }

  for (let location of locations) {
    if (location.homeStar) location.resources = maxResource
    else {
      location.resources = minResource + Math.floor((rng.next().value % 1) * (maxResource - minResource))
    }
  }

  return locations
}

function generateStarPositionInSector(currentRadius, playerCount, rng) {
  const tau = 2.0 * Math.PI;
  let angle = rng.next().value * (tau / playerCount) % tau;
  let distance = currentRadius / 2.0 + (rng.next().value % 1) * (currentRadius * 2.0);

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

function getClosestLocations(location, locations, amount) {
  let ls = new Star(location.angle, location.distance)
  return locations.sort((a, b) => {
    let la = new Star(a.angle, a.distance), lb = new Star(b.angle, b.distance)
    return ls.distanceTo(la) - ls.distanceTo(lb)
  }).slice(0, amount);
}

function getClosestLocation(location, locations) {
  return getClosestLocations(location, locations, 1)[0]
}
