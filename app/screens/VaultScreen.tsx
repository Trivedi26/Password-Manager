// eslint-disable-next-line react-native/no-color-literals
import React, { useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  vault: undefined; // this must match your actual route file name
  add: undefined;
  lock: undefined;
};

export default function LockScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authenticate = useCallback(async () => {
    console.log("🔐 Authentication started");

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    console.log(`📱 Has hardware: ${hasHardware}, Is enrolled: ${isEnrolled}`);

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Error",
        "Biometric authentication is not supported or not set up."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock PIN Vault",
      fallbackLabel: "Use Device Passcode",
    });

    console.log("🔍 Auth result:", result);

    if (result.success) {
      navigation.navigate("vault"); // ✅ fixed
    } else {
      Alert.alert("Failed", "Authentication failed. Try again.");
    }
  }, [navigation]);

  useEffect(() => {
    console.log("🚀 LockScreen mounted");
    authenticate();
  }, [authenticate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 PIN Vault Locked</Text>
      <Text style={styles.subtitle}>Authenticating with biometrics...</Text>

      <TouchableOpacity style={styles.button} onPress={authenticate}>
        <Text style={styles.buttonText}>🔁 Retry</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00c6ff",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#0f2027",
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  subtitle: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
