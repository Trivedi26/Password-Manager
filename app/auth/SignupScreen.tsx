// /app/auth/SignupScreen.tsx

import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function SignupScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !confirmPass) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPass) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created!");
      router.replace("/vault");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Signup Failed", error.message);
      } else {
        Alert.alert("Signup Failed", "Something went wrong");
      }
    }
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>📝 Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/LoginScreen")}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    padding: 14,
  },
  buttonText: {
    color: "#0072ff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  gradient: {
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 16,
    padding: 14,
  },
  link: {
    color: "#ffffff",
    marginTop: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  subtitle: {
    color: "#e0e0e0",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
