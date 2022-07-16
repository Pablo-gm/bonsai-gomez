// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA69Xt7jVW4DPmDID7UoYUnnHiK2-bW9zw",
  authDomain: "bonsai-coderhouse.firebaseapp.com",
  projectId: "bonsai-coderhouse",
  storageBucket: "bonsai-coderhouse.appspot.com",
  messagingSenderId: "607730353609",
  appId: "1:607730353609:web:5cbf73c6d1dbea51cbd418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);