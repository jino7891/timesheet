import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3MnQKNfduJAf5yPpZl2Wll_JOlvjHbag",
  authDomain: "timesheet-804c0.firebaseapp.com",
  projectId: "timesheet-804c0",
  storageBucket: "timesheet-804c0.appspot.com",
  messagingSenderId: "578818564609",
  appId: "1:578818564609:web:4c4091aa8833c87b5a5600"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;