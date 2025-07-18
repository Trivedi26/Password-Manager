/* eslint-disable */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
      router.replace("/vault" as any);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message,
      });
    }
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>
        <Text style={styles.title}>🔐 Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to your secure vault</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>🔓 Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/SignupScreen")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 24,
    borderRadius: 16,
    width: "100%",
    maxWidth: 400,
    gap: 16,
    elevation: Platform.OS === "android" ? 3 : 0,
    borderWidth: 1,
    borderColor: "#00c6ff",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00c6ff",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
  },
  button: {
    backgroundColor: "#00c6ff",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "#a0e7ff",
    textAlign: "center",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});
