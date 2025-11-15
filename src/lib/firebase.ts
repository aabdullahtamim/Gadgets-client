// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8nZ3Lz3Nax_SmxbcSTryLSnsKmrtVdFM",
    authDomain: "gadgets-66279.firebaseapp.com",
    projectId: "gadgets-66279",
    storageBucket: "gadgets-66279.firebasestorage.app",
    messagingSenderId: "1024376621092",
    appId: "1:1024376621092:web:040c4056481bd8c3f5f0b1",
    measurementId: "G-EBJN9L4WYJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
