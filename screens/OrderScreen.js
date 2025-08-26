import { StyleSheet, Text, View, FlatList,TextInput, Pressable } from 'react-native'
import CustomPressable from '../components/CustomPressable'
import React,  { useEffect, useState } from 'react'
import Realm from 'realm'
import { OrdersSchema } from '../models/OrdersSchema'
import OrderItem from '../components/OrderItem'
import RealmHelper from '../RealmHelper';

const OrderScreen = ({route, navigation}) => {
const {deliveryNote} = route.params
const [order, setOrder] = useState([]);

useEffect(() => {
    

    async function loadDelines() {
      try {
        console.log("📂 Opening Realm...");

        const  realm = await RealmHelper.getRealm();
        console.log("✅ Realm opened");
       

        const results = realm
          .objects("Orders")
          .filtered("deliveryNote == $0", deliveryNote);

         setOrder(results); // keep Realm objects live
        console.log("📊 Query results:", results.length);
      } catch (e) {
        console.error("Error opening realm", e);
      }
    }

    loadDelines();

    
  }, [deliveryNote]);

  useEffect(() => {
    console.log("order state updated:", order);
  }, [order]);



  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}> 
       <Text style={styles.title}>Note : {deliveryNote}</Text>
      </View>
     <CustomPressable
      text="Begin Scan"
      borderRadius={18}
      hoverColor="#0EA371" // only on web
      onPress={() => console.log("Pressed!")}
    />
    <FlatList
  data={order}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <OrderItem item={item}/>}
/>
    </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 2,
  },
  subtext: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    backgroundColor: "#4F46E5",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  qtyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  qtyInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginHorizontal: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    minWidth: 50,
    textAlign: "center",
    fontSize: 16,
  },
});