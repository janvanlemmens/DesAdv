import React, { useState } from "react";
import { Alert, Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import RealmHelper from "../RealmHelper";
import * as SecureStore from "expo-secure-store";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function LogoutButton() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);

              // 1️⃣ Close global Realm
              RealmHelper.closeRealm();

              // 2️⃣ Clear sensitive data
              await SecureStore.deleteItemAsync("token");
              await SecureStore.deleteItemAsync("depot");

              // 3️⃣ Reset navigation stack to Login
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "LoginScreen" }],
                })
              );

              console.log("✅ Logout successful");
            } catch (e) {
              console.error("Logout failed", e);
              Alert.alert("Error", "Logout failed. Please try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Pressable style={styles.button} onPress={handleLogout} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>Logout</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#E53E3E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    margin: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
