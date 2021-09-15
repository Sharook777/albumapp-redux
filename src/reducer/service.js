async function fetchPhotos() {
  const fetchReq = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await fetchReq.json();
  return data;
}

async function fetchAlbums() {
  const fetchReq = await fetch("https://jsonplaceholder.typicode.com/albums");
  const data = await fetchReq.json();
  return data;
}

export {fetchPhotos, fetchAlbums}