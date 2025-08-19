export const BonsSchema = {
    name: "Bons",
    properties: {
        _id: "int",
        supplier: { type: "string", indexed: true },
        date: "string"
    },
    primaryKey: "_id"
}