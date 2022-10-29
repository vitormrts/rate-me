import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzTbHiKI5OC_62ukIPAOszM2Q0nwUMVbQ",
  authDomain: "usp-rate-me.firebaseapp.com",
  projectId: "usp-rate-me",
  storageBucket: "usp-rate-me.appspot.com",
  messagingSenderId: "135086914702",
  appId: "1:135086914702:web:d712b1c384d64af3f9dddf",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const collectionsRef = {
  classrooms: collection(db, "classrooms"),
  users: collection(db, "users"),
  exams: collection(db, "exams"),
};
