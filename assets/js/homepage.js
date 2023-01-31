let artist = "salmo";
const playList = async function (song) {
  let arrSongs = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${song}`
  );
  let songs = await arrSongs.json();
  return songs;
};
const selectedSong = async function () {
  let x = await playList(artist);
  let linkTrack = x.data[0].album.id;
  let linkFetch = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${linkTrack}`
  );
  let album = await linkFetch.json();
};
selectedSong();

function cycleArr(array) {
  console.log(array);
  let singleAlb = document.querySelector("#single-album");
  singleAlb.innerHTML = 
    `<div class="col-3 p-0" id="announced-img">
            <img src="${array[18].album.cover_medium}" alt="">
        </div>
        <div class="col-9 p-0"id="announced-text">
            <p>ALBUM</p>
            <h2>${array[18].album.title}</h2>
            <p>${array[18].artist.name}</p>
            <p>ascolta di nuovo</p>
        </div>
    </div>
        `;
  let rowContainer = document.querySelector("#liked-songs");
  for (let i = 0; i < 6; i++) {
    rowContainer.innerHTML += `<div class="your-albums p-0" id="list-${i}" onclick="songId(${array[i].id})">
            <div class="albums-img">
                <img src="${array[i].album.cover_medium}" alt="">
            </div>
            <div class="albums-text">
                <p>${array[i].title}</p>
            </div>
        </div>`;
  }
  let cardsAlbum = document.querySelector('#album-cards')
  for (let i = 0; i < 10; i++) {
    cardsAlbum.innerHTML += 
    `<div class="card album-cards">
            <img src="${array[i].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${array[i].album.title}</h5>
            <p class="card-text">${array[i].artist.name}</p>
        </div>
    </div>`;
  }
}
function songId(id) {
  console.log(id);
}
playList(artist).then(function (data) {
  cycleArr(data.data);
});

// let artist = 'gianniceleste'

//  async function songList(artist){
//     let url = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
//     return url.json()
// }
// function albumNames(data){
//     data.forEach((el) => {
//         console.log(el.album.title)
//     });
// }

// songList(artist).then(function(data){
//     albumNames(data.data)
//     console.log(data);

// })
