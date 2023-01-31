const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

const fetchByQuery = async (idi) => {
  const res = await fetch(`${APIUrl}${idi}`)
  const { id, tracklist } = await res.json()
  // console.log(tracklist)
  const tracce = await fetch(tracklist)
  const { data } = await tracce.json()
  // console.log(data)
  const copertina = data[3].album.cover_xl
  const nomeArtista = data[3].artist.name

  // console.log(

  let divImg = document.querySelector("#immagine")
  divImg.innerHTML += `
  
  
  <img src="${copertina}" alt="pic-album" style="object-fit: cover; height:48vh;" class="w-100">
  <p style="margin-top: 0;
  margin-bottom: 1rem;
  position: relative;
  top: -26vh;
  left: 6px; color:white; font-weight: bold;"> Artista verificato
  <i class="fa-solid fa-certificate" style="color: #3d91f4"
  ><span style="position: relative;
  left: -15px;
  top: -1px;
  color: white;"><i class="fa-solid fa-check" style="font-weight: 900;
  font-size: small;"></i></span
  ></i>
  </p> 
  
  <h1 style="font-weight: bold; color: white; position: relative; top: -195px;font-size: 6rem; margin: 0.08em 3px 0.12em;">${nomeArtista}</h1>
  <p style="position: relative;
  top: -30vh;
  color: white; margin: 0.08em 3px 0.12em;">1.458.400 ascoltatori mensili</p>
  
  `
  return data
}

const renderFavoriteSongs = async () => {
  let canzoni = await fetchByQuery("13")
  console.log(canzoni)
  for (let i = 0; i < canzoni.length; i++) {
    const canzonePrincipale = canzoni[i]
    const div = document.querySelector("#carta")
    console.log(div)
    div.innerHTML += `
    <div class="row m-3">
    <div class="col-1 text-light text-center">${i + 1}</div>
    <div class="col-2 "><img src="${
      canzonePrincipale.album.cover_xl
    }" alt="" style="width: 60px;"></div>
    <div class="col-4 text-light">${canzonePrincipale.title}</div>
    <div class="col-3 text-light">${canzonePrincipale.rank}</div>
    <div class="col-2 text-light">${(canzonePrincipale.duration / 60).toFixed(
      2
    )}</div>
    </div>
    `
  }
}

window.onload = async () => {
  await renderFavoriteSongs()
}
