import mongoose from "mongoose";

const productoCollection = "productos";
let lastId = 0;

const productoSchema = new mongoose.Schema({
    id: { type: Number, require: true, unique: true, default: () => ++lastId  }, 
    title: { type: String,  max: 100 },
    description: { type: String,  max: 100 },
    price: { type: Number,},
    stock: { type: Number,},
    category: { type: String, max: 100 },
    code: { type: String, max: 100, unique: true },
    thumbnail: { type: String, max: 100 
    },
});

const productoModel = mongoose.model(productoCollection, productoSchema);

export default productoModel