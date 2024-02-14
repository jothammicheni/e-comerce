// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Add this import for the Realtime Database
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyD5h8uuszqhXP6HCafqquVhVFiyvJ9RO-o",
  authDomain: "ecomerce-app-683a0.firebaseapp.com",
  projectId: "ecomerce-app-683a0",
  storageBucket: "ecomerce-app-683a0.appspot.com",
  messagingSenderId: "702569146656",
  appId: "1:702569146656:web:7bdb60778bba5500184f45",
  measurementId: "G-N6TD6M1KK6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export authentication and database instances
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage =getStorage(firebaseApp)