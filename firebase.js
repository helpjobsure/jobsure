// firebase.js
// Uses Firebase Web SDK ES modules (CDN). Works with your project config.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
// (Import other Firebase services here if you need them later)

const firebaseConfig = {
  apiKey: "AIzaSyD19JkNIzaO1z7kLcoLD5V4x01-gObCPnA",
  authDomain: "jobsure-115fa.firebaseapp.com",
  projectId: "jobsure-115fa",
  storageBucket: "jobsure-115fa.firebasestorage.app",
  messagingSenderId: "575119834568",
  appId: "1:575119834568:web:75bab1d7d3cb73ec4754fd",
  measurementId: "G-6KTNMMZHG9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
