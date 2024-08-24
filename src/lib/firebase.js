// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoWYwHO27RFEsPqLM5ahWAIhHX63Vk9TE",
  authDomain: "chat-application-6edc5.firebaseapp.com",
  projectId: "chat-application-6edc5",
  storageBucket: "chat-application-6edc5.appspot.com",
  messagingSenderId: "301601230122",
  appId: "1:301601230122:web:bccd57e0d6b07d03d7a253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth =getAuth();
export const db =getFirestore();
export const storage=getStorage();