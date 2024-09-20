// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt79us3Fk3UKh2Oxg3Uls4cRE3cNqexQw",
  authDomain: "accfit-4d42e.firebaseapp.com",
  projectId: "accfit-4d42e",
  storageBucket: "accfit-4d42e.appspot.com",
  messagingSenderId: "808242565935",
  appId: "1:808242565935:web:bc099c4f3d71a56b9747da",
  measurementId: "G-JFF96V0FV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);

// Forzar la conexión directa a Firestore sin persistencia offline
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Esto fuerza a Firestore a evitar la caché y hacer solicitudes directas
  useFetchStreams: false
});