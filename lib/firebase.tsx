import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCkKvXgPbR_jYkjjbG3PDGN6w_jM95Anfg",
    authDomain: "learnfirebase-544b9.firebaseapp.com",
    databaseURL: "https://learnfirebase-544b9-default-rtdb.firebaseio.com",
    projectId: "learnfirebase-544b9",
    storageBucket: "learnfirebase-544b9.appspot.com",
    messagingSenderId: "982907877980",
    appId: "1:982907877980:web:01e53d273d9acfbe24c499",
    measurementId: "G-GSMF3Y1MKB"
};

// if there are no firebase app, initialize one
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, googleAuthProvider };
