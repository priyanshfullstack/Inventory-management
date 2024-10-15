import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdhndQ1dWEgGBkWrs06x-SOu2yqnA1A1g",
  authDomain: "priyansh-test.firebaseapp.com",
  projectId: "priyansh-test",
  storageBucket: "priyansh-test.appspot.com",
  messagingSenderId: "134598716093",
  appId: "1:134598716093:web:70bb50070d86acf6d2e5d4",
  measurementId: "G-409F6WQ3RP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
