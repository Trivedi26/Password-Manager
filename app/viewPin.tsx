import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

interface PinData {
  id: string;
  title: string;
  value: string;
}

export default function ViewPinScreen() {
  const [pins, setPins] = useState<PinData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const stored = await SecureStore.getItemAsync("pins");

        console.log("📥 Loaded Pins:", stored);
        if (stored) {
          setPins(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Error reading pins:", error);
      }
    };

    fetchPins();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🔐 Your Saved PINss</Text>

      {pins.length === 0 ? (
        <Text style={styles.emptyText}>No PINs saved yet...</Text>
      ) : (
        <FlatList
          data={pins}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>🔖 {item.title}</Text>
              <Text style={styles.pin}>📌 {item.value}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#00c6ff",
    borderRadius: 10,
    elevation: Platform.OS === "android" ? 3 : 0,
    marginTop: 20,
    padding: 12,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1a2a3a",
    borderColor: "#00c6ff",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  container: {
    backgroundColor: "#0f2027",
    flex: 1,
    padding: 20,
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  pin: {
    color: "#a0e7ff",
    fontSize: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
});
