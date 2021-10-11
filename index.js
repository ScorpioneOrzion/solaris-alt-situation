import { generateLocations } from "./data/galaxyGeneration.js"
import { Lehmner32 } from "./data/lehmner32.js"
import * as Star from './data/star.js'
const star = Star.default
const urlStarNames = 'https://raw.githubusercontent.com/mike-eason/solaris/master/server/config/game/starNames.json'
/** @type {array<string>} */
const starNames = await fetch(urlStarNames).then(data => data.json())
