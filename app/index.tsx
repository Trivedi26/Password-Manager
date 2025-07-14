import { StyleSheet, Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to PIN Vault 🔐</Text>
        <Text style={styles.subtitle}>Secure your PINs smartly.</Text>

        <Button title="Go to Vault" onPress={() => router.push("./vault")} />
        <Button title="Add New PIN" onPress={() => router.push("./add")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    gap: 15,
    borderRadius:8
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#38434D",
    marginBottom: 20,
  },
});
