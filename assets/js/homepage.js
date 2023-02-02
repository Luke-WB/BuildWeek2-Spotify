let artist = "eminem"
let artist2 = "dreamtheater"
const playList = async function (song) {
  let arrSongs = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${song}`
  )
  let songs = await arrSongs.json()

  return songs
}
const selectedAlbum = async function (song) {
  let linkFetch = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${song}`
  )
  let album = await linkFetch.json()
  return album
}
function cycleArr(array) {
  console.log(array)
  let rowContainer = document.querySelector("#liked-songs")
  for (let i = 0; i < 6; i++) {
    rowContainer.innerHTML += `<div class="your-albums p-0" id="list-${i}" onclick="songId(${array[i].album.id})">
            <div class="albums-img">
                <img src="${array[i].album.cover_medium}" alt="">
            </div>
            <div class="albums-text">
                <p>${array[i].title}</p>
            </div>
        </div>`
  }
  let cardsContainer = document.querySelector("#title1")
  let titleAlbum = document.createElement("p")
  titleAlbum.innerText = `${array[0].artist.name}`
  titleAlbum.classList.add("mt-4")
  cardsContainer.appendChild(titleAlbum)
  let cardsAlbum = document.querySelector("#album-cards1")
  for (let i = 0; i < 5; i++) {
    cardsAlbum.innerHTML += `<div class="card album-cards" onclick="songId(${array[i].album.id})">
            <img src="${array[i].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between py-3 px-0">
            <h5 class="card-title fs-6 ">${array[i].album.title}</h5>
            <a href="./artist.html?id=${array[i].artist.id}"class="card-text">${array[i].artist.name}</a>
        </div>
    </div>`
  }
}
function secondAlbumCycle(array) {
  console.log(array)
  let singleAlb = document.querySelector("#single-album")
  singleAlb.innerHTML = `<div class="p-0" id="announced-img">
            <img src="${array[18].album.cover_medium}"  alt="">
        </div>
        <div class="ps-3"id="announced-text">
            <p>ALBUM</p>
            <h2>${array[18].album.title}</h2>
            <p>${array[18].artist.name}</p>
            <p>ascolta di nuovo</p>
            <button id="single-btn1"  onclick="songId(${array[18].album.id})">Play</button>
            <button id="single-btn2">Salva</button>
        </div>
    </div>
        `
  let cardsContainer = document.querySelector("#title2")
  let titleAlbum = document.createElement("p")
  titleAlbum.innerText = `${array[0].artist.name}`
  titleAlbum.classList.add("mt-4")
  cardsContainer.appendChild(titleAlbum)
  let cardsAlbum = document.querySelector("#album-cards2")

  for (let i = 0; i < 5; i++) {
    cardsAlbum.innerHTML += `
    <div class="card album-cards"  onclick="songId(${array[i].album.id})">
            <img src="${array[i].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between py-3 px-0">
            <h5 class="card-title fs-6 ">${array[i].album.title}</h5>
            <a href="./artist.html?id=${array[i].artist.id}"class="card-text">${array[i].artist.name}</a>
        </div>
    </div>`
  }
}
function songId(id) {
  id.onclick = location.assign(`./album-page.html?id=${id}`)
}
playList(artist).then(async function (data) {
  await selectedAlbum(artist2).then(function (data) {
    secondAlbumCycle(data.data)
  })
  cycleArr(data.data)
})

window.onscroll = function () {
  const myNav = document.querySelector(".navSopra")

  if (window.scrollY > 80) {
    myNav.classList.add("nav-colored")
    // myNav.classList.remove("nav-transparent")
  } else {
    // myNav.classList.add("nav-transparent")
    myNav.classList.remove("nav-colored")
  }
}

const bottiniCambiati = () => {
  const prev = document.querySelector("#bottonesUno")
  window.history.back(prev)
}
const bottiniCambiatiDue = () => {
  const next = document.querySelector("#bottonesDue")
  window.history.forward(next)
}
