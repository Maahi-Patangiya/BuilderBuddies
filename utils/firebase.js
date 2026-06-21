// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGbF5TpO2_KZ30MMRnOvRXFqQbjSXmUSg",
  authDomain: "migrant-worker-app-ef260.firebaseapp.com",
  projectId: "migrant-worker-app-ef260",
  storageBucket: "migrant-worker-app-ef260.firebasestorage.app",
  messagingSenderId: "301172495158",
  appId: "1:301172495158:web:976be4b8036f1cfea01997",
  measurementId: "G-D57K3FLEB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };