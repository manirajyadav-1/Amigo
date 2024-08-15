import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "project1-3b6f1.firebaseapp.com",
  projectId: "project1-3b6f1",
  storageBucket: "project1-3b6f1.appspot.com",
  messagingSenderId: "101141570070",
  appId: "1:101141570070:web:48fea7945e78610c3a8b37",
  measurementId: "G-J11DCBKLB2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage};
