import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function ScanScreen() {
  const [barcode, setBarcode] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Scan a code:</Text>

      {/* Scanner will "type" here */}
      <TextInput
        style={styles.input}
        placeholder="Scan barcode..."
        value={barcode}
        onChangeText={setBarcode}
        autoFocus
      />

      <Text style={styles.result}>Scanned: {barcode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  result: { marginTop: 20, fontSize: 16, fontWeight: "500" },
});
