// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAkH9WiG08Lm84MDJITL0x5rc2X8WO3A7g",
  authDomain: "event-manager-f1350.firebaseapp.com",
  projectId: "event-manager-f1350",
  storageBucket: "event-manager-f1350.appspot.com",
  messagingSenderId: "426731898798",
  appId: "1:426731898798:web:078c28ab64ee5cb2aaaa3f",
  measurementId: "G-S8VCJC5VHQ"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);