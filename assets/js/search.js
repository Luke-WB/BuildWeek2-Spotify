const Url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";

const ricerca = async (query) => {
  const song = await fetch(`${Url}${query}`);
  const songCercate = await sessionStorage.json();
  console.log(songCercate);
};
