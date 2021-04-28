import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC_BPXRiZi3T8NsIo4X0WTMlYZxhoHJS-w",
    authDomain: "image-comm-e1b46.firebaseapp.com",
    projectId: "image-comm-e1b46",
    storageBucket: "image-comm-e1b46.appspot.com",
    messagingSenderId: "857222978016",
    appId: "1:857222978016:web:5b58cddd729a5a7e3cb385",
    measurementId: "G-B4M1LCEGW9",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

export { auth, apiKey, firestore, storage, realtime };