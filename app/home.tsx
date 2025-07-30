import React, { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

interface PinItem {
  id: string;
  title: string;
  value: string;
}

export default function HomeScreen() {
  const [pins, setPins] = useState<PinItem[]>([]);
  const router = useRouter();

  const loadPins = async () => {
    const data = await SecureStore.getItemAsync("pins");
    if (data) setPins(JSON.parse(data));
  };

  // ✅ This ensures data reloads when returning to this screen
  useFocusEffect(
    React.useCallback(() => {
      loadPins();
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Add New PIN" onPress={() => router.push("/add")} />
      <FlatList
        data={pins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 16 }}>
              {item.title}: {item.value}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
