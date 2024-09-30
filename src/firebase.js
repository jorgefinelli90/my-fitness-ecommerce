// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase para tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyDt79us3Fk3UKh2Oxg3Uls4cRE3cNqexQw",
  authDomain: "accfit-4d42e.firebaseapp.com",
  projectId: "accfit-4d42e",
  storageBucket: "accfit-4d42e.appspot.com",
  messagingSenderId: "808242565935",
  appId: "1:808242565935:web:bc099c4f3d71a56b9747da",
  measurementId: "G-JFF96V0FV7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Authentication y Firestore
export const auth = getAuth(app); // Inicializa Firebase Authentication
export const db = getFirestore(app); // Inicializa Firestore
