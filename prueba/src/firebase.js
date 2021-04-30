import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBNOyGBtsnxIHquyNgZkh0J6nwHVU75JZQ",
    authDomain: "pruebaelcolombiano.firebaseapp.com",
    databaseURL: "https://pruebaelcolombiano-default-rtdb.firebaseio.com",
    projectId: "pruebaelcolombiano",
    storageBucket: "pruebaelcolombiano.appspot.com",
    messagingSenderId: "230709769094",
    appId: "1:230709769094:web:ad3d50bc93f72fe6ffb207"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

