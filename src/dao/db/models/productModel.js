import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import mongoosePaginate from 'mongoose-paginate-v2';


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
        default: "comida",
        index: true
     },
    code: { type: Number, unique: true },
    thumbnail: { type: String, max: 100 },
    quantity: { type: Number, default: 1 },
    Date: { type: Date},
});


productoSchema.plugin(mongoosePaginate)

const productoModel = mongoose.model(productoCollection, productoSchema);

export default productoModel