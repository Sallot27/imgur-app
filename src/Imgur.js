import React, { useState } from 'react';
import './Imgur.css';

function ImgurApp() {
  const [images, setImages] = useState([]);
  const [albumName, setAlbumName] = useState('');

  const constructEndpointUrl = () => {
    return `https://api.imgur.com/3/album/${albumName}`;
  };

  const fetchWithPromises = () => {
    const xhr = new XMLHttpRequest();
    const url = constructEndpointUrl();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', 'Client-ID bb6fb4d90a28e05');

    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setImages(response.data.images);
      } else {
        console.error('Error occurred while fetching images');
      }
    };

    xhr.onerror = function () {
      console.error('Error occurred while fetching images');
    };

    xhr.send();
  };

  const fetchWithAsyncAwait = async () => {
    try {
      const response = await fetch(constructEndpointUrl(), {
        headers: {
          Authorization: 'Client-ID bb6fb4d90a28e05',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.data.images);
      } else {
        console.error('Error occurred while fetching images');
      }
    } catch (error) {
      console.error('Error occurred while fetching images:', error);
    }
  };

  return (
    <div className="imgur-app">
      <h1>Imgur App</h1>
      <input
        type="text"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
        placeholder="Enter album name"
      />
      <button onClick={fetchWithPromises}>Fetch with Promises</button>
      <button onClick={fetchWithAsyncAwait}>Fetch with Async/Await</button>
      <div className="image-grid">
        {images.map((image) => (
          <img key={image.id} src={image.link} alt={image.title} />
        ))}
      </div>
    </div>
  );
}

export default ImgurApp;