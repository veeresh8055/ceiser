// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ceiserai.firebaseapp.com",
  projectId: "ceiserai",
  storageBucket: "ceiserai.firebasestorage.app",
  messagingSenderId: "375392690639",
  appId: "1:375392690639:web:4c574563643377a75432ba",
  measurementId: "G-LRGZ7ES1WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()