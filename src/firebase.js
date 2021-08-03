import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyBpopxrB4z7zTSSqcIAJLfmaphljlOd92E",
    authDomain: "work-app-4a96c.firebaseapp.com",
    projectId: "work-app-4a96c",
    storageBucket: "work-app-4a96c.appspot.com",
    messagingSenderId: "594060533180",
    appId: "1:594060533180:web:a6b6f5291a26f43b8edfb9"
};

var app = firebase.initializeApp(firebaseConfig);
var fire = {}
fire.db = firebase.firestore(app);

export default fire


