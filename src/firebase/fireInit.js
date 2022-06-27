// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmuosfsRigWfKhEbUOLj7mTpRurljBJa0",
  authDomain: "firstwhile.firebaseapp.com",
  projectId: "firstwhile",
  storageBucket: "firstwhile.appspot.com",
  messagingSenderId: "332974505739",
  appId: "1:332974505739:web:b074027da75181f50cac0e",
  measurementId: "G-8R6V2RS18F",
  databaseURL: "https://firstwhile-default-rtdb.firebaseio.com/",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const realDb = getDatabase(app);
export const functions = getFunctions(app);
export const user = getAuth(app);
export const storage = getStorage(app);
export default db;
