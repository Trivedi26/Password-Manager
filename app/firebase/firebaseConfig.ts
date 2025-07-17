// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDY7L_8t7D1MEAMk1AjVZlDpNX_ZtgrCr4",
  authDomain: "password-m-256b1.firebaseapp.com",
  projectId: "password-m-256b1",
  storageBucket: "password-m-256b1.appspot.com",
  messagingSenderId: "250067465817",
  appId: "1:250067465817:web:977adc902426336680a348",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
