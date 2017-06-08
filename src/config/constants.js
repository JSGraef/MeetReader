import firebase from 'firebase'

export const config = {
    apiKey: "AIzaSyA9Bp3nt7764_Rco-fHAwRsld6DyWhS1B4",
    authDomain: "teamcaptain-b3334.firebaseapp.com",
    databaseURL: "https://teamcaptain-b3334.firebaseio.com",
    projectId: "teamcaptain-b3334",
    storageBucket: "teamcaptain-b3334.appspot.com",
    messagingSenderId: "602452524568"
}

firebase.initializeApp(config)

export const ref = firebase.database().ref();
export const db = firebase.database();
export const firebaseAuth = firebase.auth;
