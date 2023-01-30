let artist = "nikopandetta"
const playList = async function (song) {
   let arrSongs = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${song}`)
    let songs = await arrSongs.json()
   return songs
}
const selectedSong = async function(){
    let x = await playList(artist)
    let linkTrack = x.data[0].album.id
    let linkFetch = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${linkTrack}`)
    let album = await linkFetch.json()
    
}
selectedSong()

function cycleArr(array){
    let ul = document.querySelector('.sidebar-list')
    array.forEach((el,index)=>{
       let li = document.createElement('li')
       li.innerText += el.title
       li.addEventListener('click',function(){
        
       })
       ul.appendChild(li)

    })
}
playList(artist).then(function(data){
    cycleArr(data.data)
})

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
