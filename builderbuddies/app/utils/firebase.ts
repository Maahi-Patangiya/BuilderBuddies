import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore"; 
import { getAuth, Auth } from "firebase/auth"; 
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUsUJgZMlvTgOVpXEjDnGNGXzch7sVUX0",
  authDomain: "builderbuddies-b56c8.firebaseapp.com",
  projectId: "builderbuddies-b56c8",
  storageBucket: "builderbuddies-b56c8.firebasestorage.app",
  messagingSenderId: "584253160425",
  appId: "1:584253160425:web:c0b380d89f163341692978",
  measurementId: "G-PX9JXXVQ97"
};

// CRASH PREVENTION: Next.js dev server hot-reloads on every save.
// This block prevents duplicate application initializations that break the compiler.
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app); 

let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, db, auth, analytics };