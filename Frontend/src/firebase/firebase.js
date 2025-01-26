import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR2jU61X0LGxDSMF8ZafHrIATHkgJPHNo",
  authDomain: "blog-project-39099.firebaseapp.com",
  projectId: "blog-project-39099",
  storageBucket: "blog-project-39099.appspot.com",
  messagingSenderId: "1089372486874",
  appId: "1:1089372486874:web:74f39494af0049844039e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app , auth}