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

const COLORS = {
  subtitle: "#38434D",
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 24,
  },
  main: {
    borderRadius: 8,
    flex: 1,
    gap: 15,
    justifyContent: "center",
    marginHorizontal: "auto",
    maxWidth: 960,
  },
  subtitle: {
    color: COLORS.subtitle,
    fontSize: 20,
    marginBottom: 20,
  },
  title: {
    borderRadius: 8,
    fontSize: 32,
    fontWeight: "bold",
  },
});
