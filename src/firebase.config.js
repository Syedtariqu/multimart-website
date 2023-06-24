// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBILyz2gasA15j6sCoa7mukKrGktZ2M35U",
  authDomain: "multimart-ac387.firebaseapp.com",
  projectId: "multimart-ac387",
  storageBucket: "multimart-ac387.appspot.com",
  messagingSenderId: "806666657428",
  appId: "1:806666657428:web:4fe730b0766db7eaabde81",
  measurementId: "G-N7MT0RPLTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
