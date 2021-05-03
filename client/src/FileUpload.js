import React, { useState } from 'react';
import {useEffect} from 'react';
import './FileUpload.css';
import Header from './Header';
import HeaderMain from './HeaderMain';
import Axios from 'axios';
import firebase from "./firebase";
import {auth} from "./firebase";
import {  useHistory } from "react-router-dom";

function FileUpload() {
  const imageStyle = {
    width: '500px',
    height: '100%',
    objectFit: 'cover',
    marginTop: '80px',
    borderRadius:'3px'
  };
  
  
  const history = useHistory();
  if(!auth.currentUser){
     history.push('/login')
  }
 
  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState('');
  const [title, setTitle]=useState('');

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
  const handleOnChange=(e) =>{
     setTitle(e.target.value);
  };

  const createTitle =() =>{
    const titleRef=firebase.database().ref('Title');
const imgTitle ={
  title,
  complete:false,
};

titleRef.push(imgTitle);
  }


  return (
   <div className="file__upload">
      <HeaderMain/>
        <Header/>
     <div className="fileUpload__header">
       <h5 className="text-center mt-4 mb-4">Dashboard</h5>
     </div>
     
   <div className="fileUpload__title ">
     
       <h6 className=" mx-3 pt-2">Title</h6>
        <input type="text" onChange={handleOnChange} value={title} placeholder="Enter you Image title"/>
     </div>
      <div className="fileUpload__form">
        <form onSubmit={uploadImage}>
        <input type="file" 
         name="image" id="image" onChange={handleChange}  />
        <button className="btn btn-primary" onClick={createTitle} >Upload</button>
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
