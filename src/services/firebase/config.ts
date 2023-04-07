// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG3rZRrywwfuD_OjZEe6tPeX4jGN6T-jQ",
  authDomain: "helping-join.firebaseapp.com",
  projectId: "helping-join",
  storageBucket: "helping-join.appspot.com",
  messagingSenderId: "509898008858",
  appId: "1:509898008858:web:7d65b64aa3b47f339da4a3"
};

// Initialize Firebase
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
