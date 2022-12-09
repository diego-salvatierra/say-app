// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8LeuGBbX1PGSJx4QrzvVTzHzxfFAO0Pk",
  authDomain: "say-439ef.firebaseapp.com",
  projectId: "say-439ef",
  storageBucket: "say-439ef.appspot.com",
  messagingSenderId: "736298728107",
  appId: "1:736298728107:web:83fa7f720e9122465d55ee",
  measurementId: "G-KW0GJRMS1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);