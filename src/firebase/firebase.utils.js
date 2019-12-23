import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAxhCZ4M7hQwakPRsAj4vB3FjY0xpcp5Bc",
    authDomain: "crown-db-fa2cd.firebaseapp.com",
    databaseURL: "https://crown-db-fa2cd.firebaseio.com",
    projectId: "crown-db-fa2cd",
    storageBucket: "crown-db-fa2cd.appspot.com",
    messagingSenderId: "1042954758239",
    appId: "1:1042954758239:web:ca0058bef9db673eb513ea",
    measurementId: "G-YCLQW4RQXZ"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName,email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;