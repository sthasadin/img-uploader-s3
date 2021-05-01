import React, { useState } from 'react';
import Axios from 'axios';

export default function App() {
  const imageStyle = {
    width: '500px',
    height: '500px',
    objectFit: 'cover',
    marginTop: '100px',
  };

  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState('');
  function uploadImage(e) {
    e.preventDefault();
    if (!image) {
      console.log('No image Selected');
      return;
    }
    let formData = new FormData();
    formData.append('image', image);

    Axios.post('/api/imageupload', formData).then((response) => {
      e.target.image.value = null;
      setImage('');
      //setIsUploaded('/uploads/' + response.data.filename);
      setIsUploaded(response.data.amazon.Location);
      console.log(response.data);
    });
  }
  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={uploadImage}>
        <input type="file" name="image" id="image" onChange={handleChange} />
        <button>Upload</button>
      </form>
      {isUploaded ? (
        <img src={isUploaded} style={imageStyle} alt="random image uploads" />
      ) : (
        <div style={imageStyle}> No images uploaded yet</div>
      )}
    </div>
  );
}
