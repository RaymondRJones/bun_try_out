
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: "flight-chat-application.firebaseapp.com",

  projectId: "flight-chat-application",

  storageBucket: "flight-chat-application.appspot.com",

  messagingSenderId: "255026519529",

  appId: "1:255026519529:web:b20cbc1fe9bbbdeb4abf78"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };