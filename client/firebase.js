// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "oauthwith-97cdd.firebaseapp.com",
  projectId: "oauthwith-97cdd",
  storageBucket: "oauthwith-97cdd.firebasestorage.app",
  messagingSenderId: "24841816335",
  appId: "1:24841816335:web:4e311bdab5d4457401167a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app, auth};