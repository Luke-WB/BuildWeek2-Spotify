let song = "nikopandetta"
const playList = async function (song) {
   let arrSongs = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${song}`)
    let songs = await arrSongs.json()
   return songs
}
const selectedSong = async function(){
    let x = await playList(song)
    let linkTrack = x.data[0].album.id
    let linkFetch = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${linkTrack}`)
    let album = await linkFetch.json()
    console.log(album);
}
selectedSong()


