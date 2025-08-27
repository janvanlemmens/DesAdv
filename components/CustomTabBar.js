import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        borderTopWidth: 0.5,
        borderTopColor: "#ccc",
        backgroundColor: "#fff",
        marginBottom: 16
      }}
    >
      {state.routes.map((route, index) => {
        // Skip hidden tabs (e.g., Scan)
        if (route.name === "Scan") return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused
          ? options.tabBarActiveTintColor || "blue"
          : options.tabBarInactiveTintColor || "gray";

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {options.tabBarIcon && options.tabBarIcon({ color, size: 24 })}
            {options.tabBarShowLabel !== false && (
              <Text style={{ color, fontSize: 12, marginTop: 2 }}>{label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;
