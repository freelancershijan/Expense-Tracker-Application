// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiV7joTT1jyH4KM6kKefHktnNkl0qjkZQ",
    authDomain: "expense-tracking-software.firebaseapp.com",
    projectId: "expense-tracking-software",
    storageBucket: "expense-tracking-software.appspot.com",
    messagingSenderId: "192991273654",
    appId: "1:192991273654:web:67d39b463ccb4e7072bc17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;