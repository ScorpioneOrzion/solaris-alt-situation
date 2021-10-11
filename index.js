import generateLocations from "./data/galaxyGeneration.js"
import Star from './data/star.js'
const urlStarNames = 'https://raw.githubusercontent.com/mike-eason/solaris/master/server/config/game/starNames.json'
/** @type {array<string>} */
const starNames = await fetch(urlStarNames).then(data => data.json())

let time = 0;
const playerCount = 10;

function nextTick() {
    time += 1;

}

let stars;

function initialize() {
    stars = generateLocations(playerCount)
    stars = stars.map((star, index) => new Star(star.angle, star.distance, starNames[Math.floor(Math.random() * starNames.length)], null, 50, index))
    console.log(stars)
}