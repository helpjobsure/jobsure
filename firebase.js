import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; // Keep this commented out unless you need Google Analytics

const firebaseConfig = {
    // !! IMPORTANT: These are your live, actual project credentials !!
    apiKey: "AIzaSyD19JkNIzaO1z7kLcoLD5V4x01-gObCPnA",
    authDomain: "jobsure-115fa.firebaseapp.com",
    projectId: "jobsure-115fa",
    storageBucket: "jobsure-115fa.firebasestorage.app",
    messagingSenderId: "575119834568",
    appId: "1:575119834568:web:75bab1d7d3cb73ec4754fd",
    measurementId: "G-6KTNMMZHG9" // This is for Analytics
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Services and export them for use in all other modules
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app); // Keep this commented out unless needed