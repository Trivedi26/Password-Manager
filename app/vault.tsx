// eslint-disable-next-line react-native/no-color-literals
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import Constants from "expo-constants";

export default function Page() {
  const router = useRouter();
  const appVersion = Constants.expoConfig?.version || "1.0.0";

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <Animated.View entering={FadeInDown.duration(700)} style={styles.main}>
        <Text style={styles.icon}>🔐</Text>
        <Text style={styles.title}>PIN Vault</Text>
        <Text style={styles.subtitle}>Secure your secrets smartly.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/viewPin")}
        >
          <Text style={styles.buttonText}>🔎 View Vault</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("./add")}
        >
          <Text style={styles.buttonText}>➕ Add New PIN</Text>
        </TouchableOpacity>

        <View style={styles.badges}>
          <Text style={styles.badge}>✅ 100% Offline & Secure</Text>
          <Text style={styles.badge}>✅ Biometric Authentication</Text>
          <Text style={styles.badge}>✅ Easy & Fast Access</Text>
        </View>
      </Animated.View>

      <Text style={styles.footer}>v{appVersion} • Made with ❤️ by Shubham</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  badge: {
    color: "#a0e7ff",
    fontSize: 14,
    textAlign: "center",
  },
  badges: {
    gap: 8,
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00c6ff",
    borderRadius: 10,
    elevation: Platform.OS === "android" ? 3 : 0,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  footer: {
    bottom: 20,
    color: "#999",
    fontSize: 12,
    position: "absolute",
    textAlign: "center",
  },
  icon: {
    fontSize: 56,
  },
  main: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: "#00c6ff",
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
    maxWidth: 400,
    padding: 24,
    width: "100%",
  },
  subtitle: {
    color: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
