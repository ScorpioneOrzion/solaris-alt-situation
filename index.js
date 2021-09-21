import { generateLocations } from "./data/galaxyGeneration.js"
import { Lehmner32 } from "./data/lehmner32.js"
import * as Star from './data/star.js'
const star = Star.default
const urlStarNames = 'https://raw.githubusercontent.com/mike-eason/solaris/master/server/config/game/starNames.json'
/** @type {array<string>} */
const starNames = await fetch(urlStarNames).then(data => data.json())
window.generateLocations = (starCount = 60, playerCount = 2, minResource = 10, maxResource = 50) => {
  const stars = generateLocations(starCount, playerCount, minResource, maxResource)
  let seed = Number((Math.random() * 1e8).toFixed(0))
  const rng = Lehmner32(seed)
  let newName = starNames[Math.floor(rng.next().value % starNames.length)]
  let listOfStars = [new star(stars[0].angle, stars[0].distance, newName, null, stars[0].resources)]

  for (let i = 1; i < stars.length; i++) {
    do {
      newName = starNames[Math.floor(rng.next().value % starNames.length)]
    } while (listOfStars.map(a => a.name).includes(newName))
    listOfStars.push(new star(stars[i].angle, stars[i].distance, newName, null, stars[i].resources))
  }

  return listOfStars
}
