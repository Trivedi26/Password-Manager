// eslint-disable-next-line react-native/no-color-literals
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
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  "PIN Vault": undefined;
  "Add PIN": undefined;
  Lock: undefined;
};

export default function AddPinScreen() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const savePin = async () => {
    if (!title || !value) {
      Alert.alert("Missing Fields", "Both fields are required.");
      return;
    }

    const pinsStr = await SecureStore.getItemAsync("pins");
    const pins = pinsStr ? JSON.parse(pinsStr) : [];

    const newPin = { id: uuidv4(), title, value };
    pins.push(newPin);

    await SecureStore.setItemAsync("pins", JSON.stringify(pins));
    Alert.alert("Saved ✅", "Your PIN has been saved securely.");
    navigation.goBack();
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
