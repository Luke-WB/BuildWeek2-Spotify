const APIUrl = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

const fetchByQuery = async (query) => {
  const res = await fetch(`${APIUrl}${query}`)
  const { data: songs } = await res.json()
  return songs
}

window.onload = async () => {
  await fetchByQuery("eminem")
}
