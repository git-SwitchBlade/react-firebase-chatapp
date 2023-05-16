import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCA0L9KS3jlnNuEqaU5vBgutMI4sN7204c",
  authDomain: "auth-6a2db.firebaseapp.com",
  projectId: "auth-6a2db",
  storageBucket: "auth-6a2db.appspot.com",
  messagingSenderId: "294873208271",
  appId: "1:294873208271:web:a086a86562ef12d8b3aeba",
  measurementId: "G-BCXJP4N9DY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth, provider};