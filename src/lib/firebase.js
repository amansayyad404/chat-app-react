
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


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

export const auth =getAuth();     // for authentication
export const db =getFirestore();  // Storing chats and other stuff
export const storage=getStorage(); // it will store images