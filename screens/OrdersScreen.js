import { StyleSheet, Text, View } from 'react-native'
import React,  { useEffect, useState } from 'react'
import Realm from 'realm'
import { OrdersSchema } from '../models/OrdersSchema'
import * as SecureStore from 'expo-secure-store';

export default function OrdersScreen() {

const [depot, setDepot] = useState(null);

  useEffect(() => {
    async function loadDepot() {
      console.log("voor");
      const result = await SecureStore.getItemAsync("depot");
      console.log("na");
      setDepot(result);
      return result;
    }

    async function gDeadlist(dpa) {
       console.log("depot",dpa)
    }

    async function runBoth() {
      const depotResult = await loadDepot();
      await gDeadlist(depotResult);
    }

    runBoth();
    
  }, []);


  return (
    <View>
      <Text style={styles.container}>
        Depot : {depot ?? "nog niet geladen"}
       blablabaa
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    margin : 8
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