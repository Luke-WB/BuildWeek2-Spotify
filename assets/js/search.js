const Url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const ricerca = async (query) => {
  const song = await fetch(`${Url}${query}`);
  const { data } = await song.json();
  return data;
};

const music = async (name) => {
  const searchMusic = await ricerca(name);
  /* console.log(searchMusic); */
  if (searchMusic[0].artist.name == name) {
    const divArtista = document.querySelector(".artista");
    divArtista.innerHTML += `
      <div class="text-center">
        <img src="${searchMusic[0].artist.picture_xl}" alt="Foto artista" class="foto" />
        <h6 class="mt-3 fw-bold">${searchMusic[0].artist.name}</h6>
      </div>
      `;

    searchMusic.forEach((singolaSearch) => {
      const divArtista = document.querySelector(".canzoni");
      divArtista.innerHTML += `
        <div class="card album-cards col-2 justify-content-center">
          <img src="${singolaSearch.album.cover_xl}" class="foto" alt="Foto album">
          <div class="card-body d-flex flex-column justify-content-between py-3 px-0">
            <h5 class="card-title fs-6 ">${singolaSearch.album.title}</h5>
            <a href="./artist.html?id=${singolaSearch.artist.id}"class="card-text">${singolaSearch.artist.name}</a>
          </div>
        </div>`;
    });
  }
};
window.onload = async () => {
  await music("Avicii");
};
