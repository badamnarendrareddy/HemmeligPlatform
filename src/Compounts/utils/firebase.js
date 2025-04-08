import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBm-lQdgFTVVV40HyCE6noX_V0M5qUVuak",
    authDomain: "encryption-bcd85.firebaseapp.com",
    projectId: "encryption-bcd85",
    storageBucket: "encryption-bcd85.firebasestorage.app",
    messagingSenderId: "470659405518",
    appId: "1:470659405518:web:4853252a22c5fa462fa29f",
    measurementId: "G-7980Y5KGP0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup };