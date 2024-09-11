import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbE0QoFiyUsWXM0pIQt3NfW6oljP4fbnk",
  authDomain: "wechat-a590f.firebaseapp.com",
  projectId: "wechat-a590f",
  storageBucket: "wechat-a590f.appspot.com",
  messagingSenderId: "752516761518",
  appId: "1:752516761518:web:7d91a387156c6d2a062a3f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();