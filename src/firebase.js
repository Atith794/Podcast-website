// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWTaNvqMaPKt9BKq-fMixJ5OQiq9tSYi4",
  authDomain: "podcast-react-app-38710.firebaseapp.com",
  projectId: "podcast-react-app-38710",
  storageBucket: "podcast-react-app-38710.appspot.com",
  messagingSenderId: "415251581803",
  appId: "1:415251581803:web:69e4d1d0894c0410b61a2e",
  measurementId: "G-L12J25K5QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {db,storage,auth};