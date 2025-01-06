import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiydTRNGFifjGNa1lA_uqduhhKe7hOeHM",
  authDomain: "mybudget-cdb2f.firebaseapp.com",
  projectId: "mybudget-cdb2f",
  storageBucket: "mybudget-cdb2f.firebasestorage.app",
  messagingSenderId: "537011453773",
  appId: "1:537011453773:web:44af3e6a19e0e718880104",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
