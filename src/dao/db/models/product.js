import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema } from "mongoose";

const productoCollection = "producto";


const productoSchema = new mongoose.Schema({
    id: { type: String, required: true, default: uuidv4 },
    title: { type: String,  max: 100 },
    description: { type: String,  max: 100 },
    price: { type: Number,},
    stock: { type: Number,},
    category: { 
        type: String,
        enum:["bebida", "comida", "postre"] ,
        index: true
     },
    code: { type: Number, unique: true },
    thumbnail: { type: String, max: 100 },
    quantity: { type: Number, default: 1 }
});

productoSchema.plugin(mongoosePaginate)
const productoModel = mongoose.model(productoCollection, productoSchema);

export default productoModel