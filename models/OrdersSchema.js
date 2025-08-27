export const OrdersSchema = {
  name: "Orders",
  primaryKey: "id",
  properties: {
    id: "string", // full order string
    deliveryNote: { type: "string", indexed: true }, // extracted 4th part
    depot: { type: "string", indexed: true },
    arrival: "string",
    supplier: { type: "string", indexed: true },
    article: "string",
    description: "string",
    profile: "string",
    ean: "string",
    brand: "string",
    quantity: "int",
    quantitycfm: { type: "int", default: 0 } ,
  },
};



/*
realm.write(() => {
  realm.create("Orders", {
    _id: orderString,
    deliveryNote: orderString.split("||")[3],
    depot,
    arrival,
    supplier,
    article,
    quantity: Number(quantity),
  });
});

*/