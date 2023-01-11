// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBisdec60THVMe3oRiDxzTjGhzfrniDIWs",
  authDomain: "house-marketplace-10dad.firebaseapp.com",
  projectId: "house-marketplace-10dad",
  storageBucket: "house-marketplace-10dad.appspot.com",
  messagingSenderId: "511131247680",
  appId: "1:511131247680:web:bd64dc386829a03c8a2ba5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore