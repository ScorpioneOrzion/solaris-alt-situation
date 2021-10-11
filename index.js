import GenerateLocations from "./data/galaxyGeneration.js"
import Star from './data/star.js'
const urlStarNames = 'https://raw.githubusercontent.com/mike-eason/solaris/master/server/config/game/starNames.json'
/** @type {array<string>} */
const starNames = await fetch(urlStarNames).then(data => data.json())
