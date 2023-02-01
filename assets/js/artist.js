const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

const fetchByQuery = async (idi) => {
  const res = await fetch(`${APIUrl}${idi}`)
  // console.log(res)
  const { tracklist, picture_xl, nb_fan } = await res.json()
  const tracce = await fetch(tracklist)
  const { data } = await tracce.json()
  // console.log(tracklist)
  const nomeArtista = data[3].artist.name

  // console.log()

  let divImg = document.querySelector("#immagine")
  divImg.innerHTML += `
  
  
  <img src="${picture_xl}" alt="pic-album" style="object-fit: cover; height:48vh; object-position: center;" class="w-100">
  <p style="margin-top: 0;
  margin-bottom: 1rem;
  position: relative;
  top: -26vh;
  left: 6px; color:white; font-weight: bold;"> Artista verificato
  <i class="fa-solid fa-certificate" style="color: #3d91f4; font-size: larger;"
  ><span style="position: relative;
  left: -19px;
  color: white;"><i class="fa-solid fa-check" style="font-weight: 900;
  transform: scale(0.7);"></i></span
  ></i>
  </p> 
  
  <h1 style="font-weight: bold; color: white; position: relative; top: -195px;font-size: 6rem; margin: 0.08em 3px 0.12em;">${nomeArtista}</h1>
  <p style="position: absolute;
  top: 42%;
  color: white; margin: 0.08em 3px 0.12em;">${nb_fan} ascoltatori mensili</p>
  
  `
  const imgArtista = document.querySelector("#artista-img")
  imgArtista.innerHTML += ` <img
  src="${picture_xl}"
  class="rounded-circle position-static"
  style="width: 12vh"
  alt="artist-pic"
  />
  <div id="imagginina" class="position-relative">
  <i class="fa-solid fa-heart" id="cuoricino"></i>
  </div>
  <p class="par m-0 d-flex flex-column justify-content-center">Hai messo Mi piace a 11 brani <br><span style="color:#a2adb3;" class="par m-0">Di ${nomeArtista}</span>
  </p>
  `

  return data
}

const renderFavoriteSongs = async () => {
  let canzoni = await fetchByQuery("17")
  // console.log(canzoni)
  for (let i = 0; i < canzoni.length; i++) {
    const canzonePrincipale = canzoni[i]
    const div = document.querySelector("#carta")
    // console.log(div)
    div.innerHTML += `
    <div class="row m-3 text-light cambio">
    <div class="col-1 text-light text-center">${i + 1}</div>
    <div class="col-2 "><img src="${
      canzonePrincipale.album.cover_xl
    }" alt="" style="width: 60px;"></div>
    <div class="col-5  text-light text-start">${
      canzonePrincipale.title_short
    }</div>
    <div class="col-2 text-light">${canzonePrincipale.rank}</div>
    ${Math.floor(canzonePrincipale.duration / 60)}:${
      canzonePrincipale.duration -
      [Math.floor(canzonePrincipale.duration / 60) * 60]
    }</div>
    </div>
    `
  }
}

window.onload = async () => {
  await renderFavoriteSongs()
}
