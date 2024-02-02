import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyApzR2lKe5M3Xe74yILzMlgL7rnC5xu8Hc",
  authDomain: "music-fly2.firebaseapp.com",
  projectId: "music-fly2",
  storageBucket: "music-fly2.appspot.com",
  messagingSenderId: "413413723796",
  appId: "1:413413723796:web:bb1b77b0b245b29dcbae81"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
export { app, firestore, storage, auth, database };
