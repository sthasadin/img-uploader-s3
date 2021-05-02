import React, { useState } from 'react';
import './FileUpload.css'
import Axios from 'axios';

function FileUpload() {
  const imageStyle = {
    width: '500px',
    height: '100%',
    objectFit: 'cover',
    marginTop: '80px',
    borderRadius:'3px'
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
   <div className="file__upload">
     <div className="fileUpload__header">
       <h5 className="text-center mt-4 mb-4">Dashboard</h5>
     </div>
      <div className="fileUpload__form">
        <form onSubmit={uploadImage}>
        <input type="file" name="image" id="image" onChange={handleChange} />
        <button className="btn btn-primary">Upload</button>
      </form>
      
      </div>
      
      <div className="fileUpload__imageHolder">
      {isUploaded ? (
        
        <img src={isUploaded} style={imageStyle} alt="random image uploads" />
        
      ) : (
        <div style={imageStyle}><p className="text-center">No images uploaded yet</p> </div>
      )}
      </div>
      
    </div>
  )
}

export default FileUpload
