import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import OrdersScreen from '../screens/OrdersScreen';
import SearchScreen from '../screens/SearchScreen';
import OrderScreen from '../screens/OrderScreen';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function withIconTitle(title, iconName) {
  return () => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Icon name={iconName} size={22} style={{ marginRight: 6 }} />
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
    </View>
  );
}

export default function TabsNavigator() {
  return (
      <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerTitle: withIconTitle("Orders", "cube-outline"), // 📦 in title
          tabBarIcon: ({ color, size }) => (
            <Icon name="cube-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: withIconTitle("Search", "search-outline"), // 🔎 in title
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerTitle: withIconTitle("Order", "create-outline"), // 📝 in title
          tabBarIcon: ({ color, size }) => (
            <Icon name="create-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}