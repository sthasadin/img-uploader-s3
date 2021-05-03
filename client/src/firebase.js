import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDvDsYgjgufutBSn3PaHb8ENgMtzXnGDpY",
  authDomain: "img-uploader-16c80.firebaseapp.com",
  projectId: "img-uploader-16c80",
  storageBucket: "img-uploader-16c80.appspot.com",
  messagingSenderId: "845706136918",
  appId: "1:845706136918:web:39632b338f3a26171e5af7",
  measurementId: "G-L70R0R34HS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db =firebaseApp.firestore();
const auth= firebase.auth();

export {db, auth};
export default firebase;