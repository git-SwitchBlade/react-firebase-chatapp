import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "",
  authDomain: "auth-6a2db.firebaseapp.com",
  projectId: "auth-6a2db",
  storageBucket: "auth-6a2db.appspot.com",
  messagingSenderId: "294873208271",
  appId: "1:294873208271:web:a086a86562ef12d8b3aeba",
  measurementId: "G-BCXJP4N9DY"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};