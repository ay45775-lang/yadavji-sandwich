import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqqb_XUoL9VAMzv4fk1uMViRnbZF2CS7Q",
  authDomain: "yadavji-sandwich.firebaseapp.com",
  projectId: "yadavji-sandwich",
  storageBucket: "yadavji-sandwich.firebasestorage.app",
  messagingSenderId: "676045783912",
  appId: "1:676045783912:web:16828efe91c408d2e48cdd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;