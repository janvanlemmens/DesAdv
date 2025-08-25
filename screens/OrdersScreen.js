import { StyleSheet, Text, View, FlatList, SafeAreaView, Pressable} from 'react-native'
import { StatusBar } from "react-native";
import React,  { useEffect, useState } from 'react'
import Realm from 'realm'
import { OrdersSchema } from '../models/OrdersSchema'
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const api = axios.create();

api.interceptors.request.use((config) => {
  console.log("[Request]",config);
  return config;
});

api.interceptors.response.use(
  (res) => {
  console.log("[Response]",res);
  return res;
},
(err) => {
  console.log("[Error]",err);
  return Promise.reject(err);
}
);



export default function OrdersScreen({navigation}) {

const [depot, setDepot] = useState(null);
const [orders, setOrders] = useState([])


function getDistinctNotes(notes) {
    const map = new Map();
    notes.forEach(item => {
      if (!map.has(item.deliveryNote)) {
        map.set(item.deliveryNote, {
          deliveryNote: item.deliveryNote,
          arrival: item.arrival,
          supplier: item.supplier
        })
      }
    })
    return Array.from(map.values());
  }


  useEffect(() => {
    async function loadDepot() {
      const result = await SecureStore.getItemAsync("depot");
     
      setDepot(result);
      return result;
    }

    async function gDeadlist(dpa) {

      const config = {
         schema: [OrdersSchema],
        path: "orders.realm"
      }
      
     // Realm.deleteFile(config);  // ⚠️ deletes all data
     //Realm.deleteFile();
     
      
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
     
      const res = await axios.post(apiUrl+"/rest.desadv.cls?func=gDeAdlist", {
        depot : dpa, 
      },
        {
           headers: {
             "Content-Type": "application/json",
            },
          });
      const data = res.data;

      try {
        const realm = await Realm.open({
        schema: [OrdersSchema],
        path: "orders.realm"
      })
         realm.write(() => {
           data.forEach(item => {
              const deliveryNote = item.order.split("||")[3];
              console.log("el",item.order)
              const savedOrder = realm.create("Orders", {
                  id: item.order,
                  deliveryNote,
                  depot: item.depot,
                  arrival: item.arrival,
                  supplier: item.supplier,
                  article: item.article,
                  description : item.description,
                  profile: item.profile,
                  ean: item.ean,
                  brand: item.brand,
                  quantity: parseInt(item.quantity,10),
                  quantitycfm: 0
              }, Realm.UpdateMode.Modified)

              console.log("Created:",savedOrder.id,"->", savedOrder.deliveryNote)
             
      });
      });
  const results = realm.objects("Orders");
  const plainOrders = results.map(order => ({
  id: order.id,
  deliveryNote: order.deliveryNote,
  depot: order.depot,
  arrival: order.arrival,
  supplier: order.supplier,
  article: order.article,
  description: order.description,
  profile: order.profile,
  ean: order.ean,
  brand: order.brand,
  quantity: order.quantity,
  quantitycfm: order.quantitycfm,
  }));
  setOrders(plainOrders);


      

      if (realm && !realm.isClosed) {
        realm.close()
      }

      } catch(e) {
        console.log("Realm create failed",e);
      }

       
    }

    async function runBoth() {
      const depotResult = await loadDepot();
      await gDeadlist(depotResult);
    }

    runBoth();
    
  }, []);

  

  const distinctNotes = getDistinctNotes(orders)

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right", "bottom"]}>
     <Text style={styles.title}>Delivery Notes</Text>
     <FlatList
      data={distinctNotes}
      keyExtractor={(item) => item.deliveryNote}
      renderItem={({ item }) => (
        <Pressable onPress={() => {
          navigation.navigate("Order",{"deliveryNote" : item.deliveryNote})
        }}>
        <View style={styles.card}>
          <Text style={styles.deliverynote}>📦 Delivery Note: {item.deliveryNote}</Text>
          <Text>📅 Arrival: {item.arrival}</Text>
          <Text>🏭 Supplier: {item.supplier}</Text>
        </View>
        </Pressable>
      )}
    />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
    shadowColor: "#000", //shadow on ios
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  deliverynote: {
    fontWeight: "600",
  }
})

/*
 useEffect(() => {
    let realm;

    const initRealm = async () => {
      try {
        // Open realm with your schema
        realm = await Realm.open({
          path: "myrealm",
          schema: [UserSchema],
        });

        // Write data inside a transaction
        realm.write(() => {
          realm.create("User", {
            _id: 1,
            name: "Scann",
            age: 30,
          }, "modified"); // "modified" = update if exists
        });

        // Query data back
        const users = realm.objects("User");
        console.log("All users:", users.map(u => u.name));
      } catch (err) {
        console.error("Error opening realm:", err);
      }
    };

    initRealm();

    // cleanup
    return () => {
      if (realm && !realm.isClosed) {
        realm.close();
      }
    };
  }, []);


  or instead let realm...

  const userRealm = await Realm.open({
  path: "user_data",
  schema: [UserSchema],
});

const logRealm = await Realm.open({
  path: "logs",
  schema: [LogSchema],
});

Delete a single object

realm.write(() => {
  const user = realm.objectForPrimaryKey("User", someId);
  if (user) {
    realm.delete(user);
  }
});


Delete multiple objects (query result)

realm.write(() => {
  const oldUsers = realm.objects("User").filtered("age > 40");
  realm.delete(oldUsers); // deletes all matching objects
});


Delete all objects of a type

realm.write(() => {
  const allUsers = realm.objects("User");
  realm.delete(allUsers);
});

### fetchstore

const fetchAndStore = async (dpa) => {
const res = await axios.post("https://your-api.com/orders");
const data = res.data;


const realm = await Realm.open({ 
schema: [OrderSchema],
path: orders.realm
 });


realm.write(() => {
data.forEach(item => {
const deliveryNote = item.order.split("||")[3];


realm.create("Order", {
id: item.order,
deliveryNote, // stored separately for querying
depot: item.depot,
arrival: item.arrival,
supplier: item.supplier,
article: item.article,
quantity: parseInt(item.quantity, 10),
}, Realm.UpdateMode.Modified);
});
});


// Example queries
const distinctNotes = realm.objects("Order").distinct("deliveryNote");
console.log("Distinct deliveryNotes:", distinctNotes.map(o => o.deliveryNote));


const ordersByNote = realm.objects("Order").filtered("deliveryNote = '22508190008173104'");
console.log("Orders for note 22508190008173104:", ordersByNote.length);
};

*/

 /*
     <FlatList
      data={distinctNotes}
      keyExtractor={(item) => item.deliveryNote}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ddd" }}>
          <Text>📦 Delivery Note: {item.deliveryNote}</Text>
          <Text>📅 Arrival: {item.arrival}</Text>
          <Text>🏭 Supplier: {item.supplier}</Text>
        </View>
      )}
    />
    */