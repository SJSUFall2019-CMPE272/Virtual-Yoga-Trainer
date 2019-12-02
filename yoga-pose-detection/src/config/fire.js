import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyB_6t3KQ59Jdj_g409uqU35fyWr_ja62tI",
    authDomain: "virtualtrainer-17743.firebaseapp.com",
    databaseURL: "https://virtualtrainer-17743.firebaseio.com",
    projectId: "virtualtrainer-17743",
    storageBucket: "virtualtrainer-17743.appspot.com",
    messagingSenderId: "1010674404620",
    appId: "1:1010674404620:web:515d59af1fc92c0f760d29",
    measurementId: "G-QSNC6VRPPQ"
  };

  const fire = firebase.initializeApp(firebaseConfig)
  export default fire;
