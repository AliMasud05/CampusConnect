// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGqiIZGub96YlBLXPe1FYeyBahqZGXr08",
  authDomain: "hk-academy.firebaseapp.com",
  projectId: "hk-academy",
  storageBucket: "hk-academy.firebasestorage.app",
  messagingSenderId: "981792518859",
  appId: "1:981792518859:web:9550a25f846ab9e59f614e",
  measurementId: "G-4QWP5C3CJ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export default auth;