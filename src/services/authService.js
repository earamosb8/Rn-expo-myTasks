// services/authService.js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
