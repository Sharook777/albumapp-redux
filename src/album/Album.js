import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Photos from "./Photos";
import { fetchAlbumsDispatcher } from "../reducer/albumReducer";
import { fetchPhotosDispatcher } from "../reducer/photoReducer";

import "./styles.css";

export default function Album() {
  const { albums, photos } = useSelector(({ albumApp, photoApp }) => {
    return {
      albums: albumApp.albums,
      photos: photoApp.photos,
    };
  });

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedAlbum(value);
  };

  useEffect(() => {
    fetchAlbumsDispatcher();
    fetchPhotosDispatcher();
  }, []);

  const filtersPhotos =
    photos?.filter((photo) => photo.albumId === +selectedAlbum) || [];

  return (
    <div className="wrapper">
      <div className="select-wrapper">
        <select className="select" onChange={handleChange}>
          <option value="0">Select Album</option>
          {albums?.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
      </div>

      <div className="album-wrapper">
        {filtersPhotos?.map((photo) => (
          <Photos key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
}
