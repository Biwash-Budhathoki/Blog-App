// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-acfb3.firebaseapp.com",
  projectId: "mern-blog-app-acfb3",
  storageBucket: "mern-blog-app-acfb3.appspot.com",
  messagingSenderId: "437432053282",
  appId: "1:437432053282:web:953c97e21632be72b8247b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);