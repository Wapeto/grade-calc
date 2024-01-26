// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCojMrW2PMlLUM8gDqhpDHb0gUp48LLQGU",
  authDomain: "wapeto-grade-calculator.firebaseapp.com",
  databaseURL: "https://wapeto-grade-calculator-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wapeto-grade-calculator",
  storageBucket: "wapeto-grade-calculator.appspot.com",
  messagingSenderId: "804869890456",
  appId: "1:804869890456:web:9c5327894ef3db167e4bed",
  measurementId: "G-1SJTYRSG9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const db = getFirestore(app);