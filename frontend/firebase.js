// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "zingo-food-delivery-fcada.firebaseapp.com",
  projectId: "zingo-food-delivery-fcada",
  storageBucket: "zingo-food-delivery-fcada.firebasestorage.app",
  messagingSenderId: "412222358612",
  appId: "1:412222358612:web:935adb239ba3d7569099c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
