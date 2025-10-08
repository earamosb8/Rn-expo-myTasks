import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../themes/colors";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    } else {
      // Si no hay usuario autenticado, regresa al login
      navigation.replace("Login");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (isLoggedIn) {
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.homeText}>¡Bienvenido a Home, {email}!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a MyTasks+!</Text>
      {user && (
        <Text style={styles.userText}>Sesión iniciada como: {user.email}</Text>
      )}
      <Pressable style={styles.btn} onPress={handleLogout}>
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ligthyellow,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.darkBlue,
    marginBottom: 24,
  },
  userText: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 32,
  },
  btn: {
    backgroundColor: colors.redCarmesi,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  btnText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
