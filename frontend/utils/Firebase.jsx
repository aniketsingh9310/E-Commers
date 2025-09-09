import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-f0ffa.firebaseapp.com",
  projectId: "loginonecart-f0ffa",
  storageBucket: "loginonecart-f0ffa.firebasestorage.app",
  messagingSenderId: "198732073268",
  appId: "1:198732073268:web:e85976003f6e3564277d61"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}