import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";

const generateUUID = async () => {
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  const hex = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    "4" + hex.substring(13, 16),
    (8 + (parseInt(hex.substring(16, 1), 16) % 4)).toString(16) +
      hex.substring(17, 20),
    hex.substring(20, 32),
  ].join("-");
};
export default function AddPinScreen() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const savePin = async () => {
    if (!title || !value) {
      Alert.alert("Missing Fields", "Both fields are required.");
      return;
    }

    try {
      const pinsStr = await SecureStore.getItemAsync("pins");
      const pins = pinsStr ? JSON.parse(pinsStr) : [];

      console.log("📌 Existing Pins Before Add:", pins);

      const newPin = { id: await generateUUID(), title, value };
      pins.push(newPin);

      await SecureStore.setItemAsync("pins", JSON.stringify(pins));
      console.log("✅ PIN Saved:", newPin);

      Alert.alert("Saved ✅", "Your PIN has been saved securely.");
      router.back(); // Go back to previous screen
    } catch (error) {
      console.error("❌ Error saving PIN:", error);
      Alert.alert("Error", "Something went wrong while saving your PIN.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Add a New PIN 🔐</Text>

        <TextInput
          placeholder="PIN Title (e.g., HDFC ATM)"
          placeholderTextColor="#888"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TextInput
          placeholder="PIN Number"
          placeholderTextColor="#888"
          value={value}
          onChangeText={setValue}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={savePin}>
          <Text style={styles.buttonText}>💾 Save PIN</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Your PIN is stored locally and securely.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#00c6ff",
    borderRadius: 10,
    marginTop: 8,
    padding: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1e2a38",
    borderRadius: 16,
    elevation: 6,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  container: {
    backgroundColor: "#0f2027",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  helperText: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    padding: 12,
  },
});
