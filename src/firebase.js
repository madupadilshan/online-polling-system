import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB8E3sQ91yNbFRsVlj7J2_tBN48BU_ANg",
  authDomain: "online-polling-system-fbfc9.firebaseapp.com",
  projectId: "online-polling-system-fbfc9",
  storageBucket: "online-polling-system-fbfc9.firebasestorage.app",
  messagingSenderId: "890097230051",
  appId: "1:890097230051:web:d4d5adc71bf550d38225d6",
  measurementId: "G-DDSV8G190P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
