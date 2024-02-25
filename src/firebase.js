// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe7qAafUJE-Xkd0G09vyzAykrt-4Uv0MY",
  authDomain: "prfrontend-507a2.firebaseapp.com",
  projectId: "prfrontend-507a2",
  storageBucket: "prfrontend-507a2.appspot.com",
  messagingSenderId: "943399850841",
  appId: "1:943399850841:web:41cfd327e0e70633583248",
  measurementId: "G-M7QWLVC1PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;

