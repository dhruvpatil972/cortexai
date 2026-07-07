// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rtexai.firebaseapp.com",
  projectId: "rtexai",
  storageBucket: "rtexai.firebasestorage.app",
  messagingSenderId: "362254286272",
  appId: "1:362254286272:web:ffc0f2bf9a20fbb0729c25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()