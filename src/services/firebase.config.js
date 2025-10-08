// services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBM8LR4OBJvliXe1BdTzOFdnz596iMQpIo",
  authDomain: "my-tasks-6317e.firebaseapp.com",
  databaseURL: "https://my-tasks-6317e-default-rtdb.firebaseio.com",
  projectId: "my-tasks-6317e",
  storageBucket: "my-tasks-6317e.firebasestorage.app",
  messagingSenderId: "111991043031",
  appId: "1:111991043031:web:f1caac91e937726f409192",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// ✅ Inicializa Realtime Database
const db = getDatabase(app);

export { app, auth, db };
