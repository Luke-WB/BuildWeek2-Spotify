const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

const fetchByQuery = async (idi) => {
  const res = await fetch(`${APIUrl}${idi}`)
  const { id, tracklist } = await res.json()
  //   console.log(tracklist)
  const tracce = await fetch(tracklist)
  const tutte = await tracce.json()
  const copertina = tutte.data[3].album.cover_xl
  const nomeArtista = tutte.data[3].artist.name
  const titoliCanzoni = tutte.data[3].title

  console.log(tutte)

  let divImg = document.querySelector("#immagine")
  divImg.innerHTML += `


  <img src="${copertina}" alt="${titoliCanzoni}" style="object-fit: cover; height:48vh;" class="w-100">
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
  
  <h1 style="font-weight: bold; color: white; position: relative; top: -195px;font-size: 6rem; margin: 0.08em 0px 0.12em;">${nomeArtista}</h1>
  <p style="position: relative;
  top: -30vh;
  color: white; margin: 0.08em 0px 0.12em;">1.458.400 ascoltatori mensili</p>

  `
}

const renderFavoriteSongs = async () => {
  let canzoni = await fetchByQuery("13")
  //   console.log(canzoni)
}

window.onload = async () => {
  await renderFavoriteSongs()
}
