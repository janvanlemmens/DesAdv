export const OrdersSchema = {
  name: "Orders",
  primaryKey: "_id",
  properties: {
    _id: "string", // full order string
    deliveryNote: { type: "string", indexed: true }, // extracted 4th part
    depot: { type: "string", indexed: true },
    arrival: "string",
    supplier: { type: "string", indexed: true },
    article: "string",
    quantity: "int",
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