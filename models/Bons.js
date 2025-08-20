export const BonsSchema = {
    name: "Bons",
    properties: {
        _id: "string", //bestelling
        supplier: { type: "string", indexed: true },
        arrival: "string"
    },
    primaryKey: "_id"
}