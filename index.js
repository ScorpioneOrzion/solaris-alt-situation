const urlStarNames = 'https://raw.githubusercontent.com/mike-eason/solaris/master/server/config/game/starNames.json'
const starNames = await fetch(urlStarNames).then(data => data.json())
