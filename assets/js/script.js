let songs
const playList = function () {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=Giannivezzosi")
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(`c'e stato un errore nella chiamata`);
        }
    }).then(function(response){
         songs = response.data
        
    })  
    .catch(function (error) {
        console.log(`c'e stato un errore : ${error}`);
    });
};
playList()
    

