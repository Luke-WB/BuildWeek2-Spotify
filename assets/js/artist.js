const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const UrlSong = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const fetchByQuery = async (idi) => {
  console.log(idi);
  const res = await fetch(`${APIUrl}${idi}`);
  // console.log(res)
  const { tracklist, picture_xl, nb_fan, name } = await res.json();
  const tracce = await fetch(tracklist);
  const { data } = await tracce.json();
  // console.log(tracklist)
  const nomeArtista = name;
  console.log(nomeArtista);

  // console.log()

  let divImg = document.querySelector("#immagine");
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
  
  `;
  const imgArtista = document.querySelector("#artista-img");
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
  `;

  return data;
};

const renderFavoriteSongs = async (id) => {
  let canzoni = await fetchByQuery(id);
  // console.log(canzoni)
  for (let i = 0; i < canzoni.length; i++) {
    const canzonePrincipale = canzoni[i];
    const div = document.querySelector("#carta");
    // console.log(div)
    div.innerHTML += `
    <div class="row p-0 m-0 mb-3 text-light align-items-center cambio"
    onclick="canzoniSingole('${canzonePrincipale.title}','${canzonePrincipale.artist.name}')">
    <div class="col-1 text-light text-center ">${i + 1}</div>
    <div class="col-2  "><img src="${canzonePrincipale.album.cover_xl}" alt="" style="width: 60px;"></div>
    <div class="col-5  text-light text-start ">${canzonePrincipale.title_short}</div>
    <div class="col-2  text-light">${canzonePrincipale.rank}</div>
    ${Math.floor(canzonePrincipale.duration / 60)}:${
      canzonePrincipale.duration - [Math.floor(canzonePrincipale.duration / 60) * 60]
    }</div>
    </div>
    `;
  }
};

const canzoniSingole = async (title, name) => {
  const song = await fetch(`${UrlSong}${title}${name}`);
  const { data } = await song.json();
  console.log(data);
  const primaCanzone = data[0];
  const canzoneSingola = document.querySelector(".singoli");
  canzoneSingola.innerHTML = `
  <div class="col-6">
    <img src="${primaCanzone.album.cover_xl}" alt="Foto album" style="width: 60px; height: 60px"/>
  </div>
  <div class="col-6 d-flex align-items-center">
    <span class="fw-bold">${primaCanzone.title} </span>
    <br>
    ${primaCanzone.artist.name}
  </div>
  `;
};

window.onload = async () => {
  let url = new URLSearchParams(location.search);
  let id = url.get("id");
  if (!id) {
    window.location.assign("./homepage.html");
  }
  await renderFavoriteSongs(id);
};

window.onscroll = function () {
  const myNav = document.querySelector(".navSopra");

  if (window.scrollY > 80) {
    myNav.classList.add("nav-colored");
    // myNav.classList.remove("nav-transparent")
  } else {
    // myNav.classList.add("nav-transparent")
    myNav.classList.remove("nav-colored");
  }
};

const bottiniCambiati = () => {
  const prev = document.querySelector("#bottonesUno");
  window.history.back(prev);
};
const bottiniCambiatiDue = () => {
  const next = document.querySelector("#bottonesDue");
  window.history.forward(next);
};
