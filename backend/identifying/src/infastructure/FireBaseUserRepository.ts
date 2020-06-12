import firebase from 'firebase';
import UserRepository from "../domain/UserRepository";
import admin from 'firebase-admin'

class FireBaseUserRepository implements UserRepository {

    constructor() {
        const config = {
            apiKey: "AIzaSyDgpHVICL0qqTaiNicKU5ysejCbuDs6UMI",
            authDomain: "headless-cms-15c61.firebaseapp.com",
            databaseURL: "https://headless-cms-15c61.firebaseio.com",
            projectId: "headless-cms-15c61",
            storageBucket: "headless-cms-15c61.appspot.com",
            messagingSenderId: "582836545438",
            appId: "1:582836545438:web:6ed2b833030587ceacd88f",
            measurementId: "G-CG498X230V"
        };

        firebase.initializeApp(config);
        admin.initializeApp(config, 'auth')
    }

    async signIn(email: string, password: string): Promise<any> {
        const auth = firebase.auth();
        return await auth.signInWithEmailAndPassword(email, password)
    }

    async signUp(email: string, password: string): Promise<any> {
        const auth = firebase.auth();
        return await auth.createUserWithEmailAndPassword(email, password)
    }

    async authToken(cryptedJWT: string): Promise<any> {
        const auth = admin.auth();
        return await auth.verifyIdToken(cryptedJWT)
    }
}

export default FireBaseUserRepository;