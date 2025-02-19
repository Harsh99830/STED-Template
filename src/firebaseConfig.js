// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx67qMjU1UbN6mEZ8NConoOTK_gBnylCE",
  authDomain: "sted-template.firebaseapp.com",
  databaseURL: "https://sted-template-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sted-template",
  storageBucket: "sted-template.firebasestorage.app",
  messagingSenderId: "121338371680",
  appId: "1:121338371680:web:306d05db9ef5489660ad05",
  measurementId: "G-3N1RK1Y061"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);