// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD19JkNIzaO1z7kLcoLD5V4x01-gObCPnA",
  authDomain: "jobsure-115fa.firebaseapp.com",
  projectId: "jobsure-115fa",
  storageBucket: "jobsure-115fa.appspot.com",
  messagingSenderId: "575119834568",
  appId: "1:575119834568:web:75bab1d7d3cb73ec4754fd",
  measurementId: "G-6KTNMMZHG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
