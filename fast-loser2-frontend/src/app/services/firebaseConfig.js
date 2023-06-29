// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIuZMyNdMEFT6uDRs3aD3pJrfeyu_3Ebg",
  authDomain: "greenridefl2-a1839.firebaseapp.com",
  projectId: "greenridefl2-a1839",
  storageBucket: "greenridefl2-a1839.appspot.com",
  messagingSenderId: "780969227916",
  appId: "1:780969227916:web:33d55ccac785c32ea7eda9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

