import { StyleSheet, Text, View, FlatList } from 'react-native'
import React,  { useEffect, useState } from 'react'
import Realm from 'realm'
import { BonsSchema } from '../models/Bons'
import * as SecureStore from 'expo-secure-store';

export default function OverzichtScreen() {

const [depot, setDepot] = useState(null);

  useEffect(() => {
    async function loadDepot() {
      console.log("voor");
      const result = await SecureStore.getItemAsync("depot");
      console.log("na");
      setDepot(result);
    }
    loadDepot();
  }, []);


  return (
    <View>
      <Text style={styles.container}>
        Depot : {depot ?? "nog niet geladen"}
       blablabzz
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


*/