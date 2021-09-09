let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://github.com/mike-eason/solaris/blob/master/server/config/game/starNames.json')
xhr.send()
xhr.onprogress = function (event) {
  console.log(`Received ${event.loaded} of ${event.total}`);
};
xhr.onload = () => {
  console.log(`Loaded: ${xhr.status} ${xhr.response}`)
}
xhr.onerror = function () {
  console.log(`Network Error`);
};
