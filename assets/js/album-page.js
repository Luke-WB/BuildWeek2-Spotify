const Url = "https://striveschool-api.herokuapp.com/api/deezer/album/"
const UrlSong = "https://striveschool-api.herokuapp.com/api/deezer/search?q="

const fetchQuery = async (query) => {
  const album = await fetch(`${Url}${query}`)
  const {
    id,
    title,
    cover_xl,
    duration,
    artist,
    release_date,
    tracks: { data },
  } = await album.json()
  const divSopra = document.querySelector(".sopra")
  divSopra.innerHTML += `
  <div class="foto-album">
    <img src="${cover_xl}" alt="Foto Album" style="width: 200px; height: 200px;" />
  </div>
  <div class="ms-4">
    <p class="scritta-album fw-bold m-0">ALBUM</p>
    <p class="titolo-album fw-bold m-0 mb-2">${title}</p>
    <div class="d-flex align-items-end">
      <div class="foto-artista">
        <img src="${
          artist.picture_xl
        }" alt="Logo Artista" class="rounded-circle me-2" style="width: 25px; height: 25px"/>
      </div>
      <div class="scritta-album d-flex align-items-end">
        <p class="m-0 fw-bold">${artist.name}</p>
        <i class="bi bi-dot"></i>
        <p class="m-0">${release_date.slice(0, 4)}</p>
        <i class="bi bi-dot"></i> 
        <p class="m-0 fw-bold">
          ${data.length} brani, 
          <span> 
            ${Math.floor(duration / 60)} min 
            ${duration - [Math.floor(duration / 60) * 60]} sec.
          </span>
        </p> 
      </div>
    </div>
  </div>
            `
  return data
}

const album = async (id) => {
  const canzoni = await fetchQuery(id)
  console.log(canzoni)
  const divSotto = document.querySelector(".elenco")
  for (let i = 0; i < canzoni.length; i++) {
    const singoli = canzoni[i]
    divSotto.innerHTML += `
    <div class="canzoni row p-0 align-items-center m-0 mb-3" 
    onclick="canzoniSingole('${singoli.title}','${singoli.artist.name}')">
      <div class="col-1 p-0 text-center">${i + 1}</div>
      <div class="col-4 p-0 text-start">
        <span class="fw-bold text-white">${singoli.title}</span>
        <br>
        ${singoli.artist.name}
      </div>
      <div class="col-3 p-0 text-end" >${singoli.rank}</div>
      <div class="col-3 p-0 text-end">
      ${Math.floor(singoli.duration / 60)}:${(
      singoli.duration - [Math.floor(singoli.duration / 60) * 60]
    )
      .toString()
      .padStart(2, "0")}
    </div>
    `
  }
}

const canzoniSingole = async (title, name) => {
  // console.log(title)
  const song = await fetch(`${UrlSong}${title}${name}`)
  const { data } = await song.json()
  console.log(data)
  const primaCanzone = data[0]
  const canzoneSingola = document.querySelector(".singoli")
  canzoneSingola.innerHTML = `
  <div class="text-end" style="width: 60px">
    <img src="${primaCanzone.album.cover_xl}" alt="Foto album" style="width: 60px; height: 60px"/>
  </div>
  <div class="text-start fs-5 ms-4" style="width: 100%" >
    <span class="fw-bold">${primaCanzone.title} </span>
    <br>
    ${primaCanzone.artist.name}
  </div>
  `
}

const playCanzoni = (preview, cover, title, artist) => {
  const canzoneSingola = document.querySelector(".singoli")
  canzoneSingola.innerHTML = `
  <div class="text-end" style="width: 60px";>
    <img src="${cover}" alt="Foto album" style="width: 60px; height: 60px"/>
  </div>
  <div class="text-start fs-5 ms-4" style="width: 100%" >
    <span class="fw-bold">${title} </span>
    <br>
    ${artist}
  </div>
  `

  const audios = document.querySelector("audio")
  // audios.play()
  // console.log(audios.paused)
  if (!audios.paused && audios.src) {
    audios.pause()
  } else {
    audios.src = preview
    audios.play()
  }
}

const pausePlays = () => {
  const audios = document.querySelector("audio")

  if (!audios.paused && audios.src) {
    audios.pause()
  } else {
    audios.play()
  }
}

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

const playCanz = (preview) => {
  const audios = document.querySelector("audio")
  // audios.play()
  console.log(audios.paused)
  if (!audios.paused && audios.src) {
    audios.pause()
  } else {
    audios.src = preview
    audios.play()
  }
}

const pausePlay = () => {
  const audios = document.querySelector("audio")

  if (!audios.paused && audios.src) {
    audios.pause()
  } else {
    audios.play()
  }
}
window.onload = async () => {
  let url = new URLSearchParams(location.search)
  let id = url.get("id")
  if (!id) {
    window.location.assign("./homepage.html")
  }
  await album(id)
}
