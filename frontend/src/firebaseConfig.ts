import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlhNT_74OFvK2vpYTV5jZnAuDrPCneN04",
    authDomain: "shout-outs-lab-ec1e7.firebaseapp.com",
    projectId: "shout-outs-lab-ec1e7",
    storageBucket: "shout-outs-lab-ec1e7.appspot.com",
    messagingSenderId: "385441442272",
    appId: "1:385441442272:web:42f01ac642a362a1a96385"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle(): void {
    firebase.auth().signInWithPopup(authProvider);
}

export function signOut(): void {
    firebase.auth().signOut();
}

export default firebase;