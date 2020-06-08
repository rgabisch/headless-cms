import { auth } from "firebase-admin";

const firebase = require('firebase')

var firebaseConfig = {
    apiKey: "AIzaSyDgpHVICL0qqTaiNicKU5ysejCbuDs6UMI",
    authDomain: "headless-cms-15c61.firebaseapp.com",
    databaseURL: "https://headless-cms-15c61.firebaseio.com",
    projectId: "headless-cms-15c61",
    storageBucket: "headless-cms-15c61.appspot.com",
    messagingSenderId: "582836545438",
    appId: "1:582836545438:web:6ed2b833030587ceacd88f",
    measurementId: "G-CG498X230V"
  };

firebase.initializeApp(firebaseConfig)

export function signIn(email: string, pass: string): any{
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email, pass)
    /*
    .catch((error: any) => {console.log(error)})
    .then((result: any) => {return result.user.id})
    */
}

export function signUp(email: string, pass: string): any{
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email, pass)
    /*
    .catch((error: any) => {console.log(error)})
    .then((result: any) => {return result.user.id})
    */
}


