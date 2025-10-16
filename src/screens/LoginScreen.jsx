import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { colors } from "../themes/colors";
import { useEffect, useState } from "react";
import { login } from "../services/authService";



const textInputWidth = Dimensions.get("window").width * 0.7;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    if (email && password) {
      setErrorMessage("");
      try {
        await login(email, password);
        console.log("Login successful");
        navigation.replace("Home");
      } catch (error) {
        console.error("Error logging in:", error.message);
        setErrorMessage("Incorrect email or password");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setErrorMessage("Empty fields");
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={colors.white}
          placeholder="Email"
          style={styles.textInput}
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor={colors.white}
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
        />
      </View>

      <Text style={{ color: colors.redCarmesi }}>{errorMessage}</Text>

      <Pressable
        style={[styles.btn, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.btnText}>Login</Text>
        )}
      </Pressable>
    </View>
  );

};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.ligthyellow,
  },
  title: {
    color: colors.darkBlue,
    fontFamily: "PressStart2P",
    fontSize: 40,
    fontWeight:"700"
  },
  subTitle: {
    fontFamily: "Montserrat",
    fontSize: 18,
    color: colors.yellow,
    fontWeight: "700",
    letterSpacing: 3,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: "center",
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    width: textInputWidth,
    color: colors.white,
  },
  footTextContainer: {
    flexDirection: "row",
    gap: 8,
  },
  whiteText: {
    color: colors.white,
  },
  underLineText: {
    textDecorationLine: "underline",
  },
  strongText: {
    fontWeight: "900",
    fontSize: 16,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.redCarmesi,
    borderRadius: 16,
    marginTop: 32,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  error: {
    padding: 16,
    backgroundColor: colors.red,
    borderRadius: 8,
    color: colors.white,
  },
});
