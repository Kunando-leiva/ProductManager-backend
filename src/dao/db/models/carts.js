
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';


const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
  id: { type: String, required: true, default: uuidv4 },
  productos: 
  { 
    type: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'producto',
          required: true,
        },
      quantity: { type: Number, default: 1 },
      }
    ],
    default: []
},

});

const carritoModel = mongoose.model(carritoCollection, carritoSchema);

export default carritoModel;





