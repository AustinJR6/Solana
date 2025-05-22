// firebase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// 🔐 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDUDQxCnSzr838RjlEcuBAlp8scrcXPyXA",
  authDomain: "greenleafcrm-8bad0.firebaseapp.com",
  projectId: "greenleafcrm-8bad0",
  storageBucket: "greenleafcrm-8bad0.appspot.com",
  messagingSenderId: "853028099061",
  appId: "1:853028099061:web:9bbc5802c11f7958bf86bc",
  measurementId: "G-BG2V6HV3D4"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🧠 Services
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
