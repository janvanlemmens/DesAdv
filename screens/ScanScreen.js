import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, StyleSheet, FlatList } from "react-native";
import CustomPressable from '../components/CustomPressable';
import { useFocusEffect } from "@react-navigation/native";
import { useRealm } from '../useRealm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function ScanScreen({route, navigation}) {
  const {orderid} = route.params
  const ref1AA = orderid.split("|")[1]
  const [barcode, setBarcode] = useState("");
  const [barcodes, setBarcodes] = useState([]);
  const [brand, setBrand] = useState('');
  const inputRef = useRef(null);
  const flatListRef = useRef(null);
  const scanTimeoutRef = useRef(null);
  const lastScanRef = useRef({ code: null, ts: 0 });
  const realm = useRealm();
  const insets = useSafeAreaInsets();

  const updateQuantities = (orderId, barcodes) => {
    realm.write(() => {
      barcodes.forEach(({code,count}) => {
          const matchingItems = realm.objects("Orders").filtered("id == $0 and ean == $1", orderId, code)
          //console.log("ma",matchingItems)
          // Update quantitycfm
          matchingItems.forEach((item) => {
            item.quantitycfm = count;
          })
      })
    })

  }

  const handleEndScan = () => {
    console.log("barcodes",barcodes)
    updateQuantities(orderid,barcodes)
    //barcodes [{"code": "3286341037012", "count": 4}]
    setBarcodes([]);
    navigation.navigate("Order",{"orderid" : orderid});
  }

// handle scanned code
  const handleScanComplete = (scannedCode) => {
    if (!scannedCode) return;
    const now = Date.now();
     if (lastScanRef.current.code === scannedCode && now - lastScanRef.current.ts < 300) {
    console.log("⚠️ Duplicate ignored:", scannedCode);
    return;
  }

  lastScanRef.current = { code: scannedCode, ts: now };

    console.log("✅ scannedCode:", JSON.stringify(scannedCode));

    // Add to list immutably
   setBarcodes((prev) => {
    // check if code already exists
    const existing = prev.find((item) => item.code === scannedCode);
    if (existing) {
      return prev.map((item) =>
        item.code === scannedCode
          ? { ...item, count: item.count + 1 }
          : item
      );
    } else {
      return [...prev, { code: scannedCode, count: 1 }];
    }
  });

    // Clear input for next scan
    setBarcode("");
    inputRef.current?.clear();
    inputRef.current?.focus();
  };

 const handleScanChange = (text) => {
  if (brand ==='unitech') return;
  setBarcode(text);

  // clear previous timeout
  if (scanTimeoutRef.current) {
    clearTimeout(scanTimeoutRef.current);
  }

  // If scanner sends newline, process immediately
  if (text.endsWith("\n")) {
    if (text.trim() !== "") {
      handleScanComplete(text.trim());
    }
    return;
  }

  // start new timeout to detect end of input
  scanTimeoutRef.current = setTimeout(() => {
    console.log("brand",brand)
    if (text.trim() !== "") {
      handleScanComplete(text.trim());
    }
  }, 100); // 50ms after last input character
};

  // handle Enter/Return key on emulator
  const handleSubmitEditing = () => {
    if (barcode.trim() !== "") {
      handleScanComplete(barcode.trim());
    }
  };

   // Refocus input every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // clear current input
      setBarcode("");
      // put cursor back
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);

      return () => {
        // cleanup if needed
      };
    }, [])
  );

  useEffect(() => {
     const init = async() => {
      const brand = await SecureStore.getItemAsync("brand");
      console.log("use")
      setBrand(brand)
     }
     init();
  }, [barcodes]);

  useEffect(() => {
    if (barcodes.length && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [barcodes]);

 return (
  
  <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
    <View style={{ alignItems: "center" }}>
      <Text style={styles.title}>Note : {ref1AA}</Text>
    </View>

    <TextInput
      ref={inputRef}
      style={styles.input}
      placeholder="Scan barcode..."
      value={barcode}
      onChangeText={handleScanChange}  // scanner detection
      onSubmitEditing={handleSubmitEditing} // emulator support
      autoFocus
      showSoftInputOnFocus={false}
    />

    {/* FlatList showing scanned barcodes */}
    <FlatList
      ref={flatListRef}
      data={barcodes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 8}}>
         <Text style={{fontSize: 18}}>{item.code}</Text>
         <Text style={{fontSize: 18}}>x{item.count}</Text>
       </View>
      )}
      style={{ flex: 1, marginTop: 10 }}
    />

    {/* End Scan button pinned at bottom */}
    <CustomPressable
      text="End Scan"
      borderRadius={18}
      hoverColor="#0EA371"
      onPress={handleEndScan}
    />
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,           // fill the screen
    padding: 8
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

