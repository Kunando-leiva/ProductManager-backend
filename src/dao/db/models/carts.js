// import mongoose from "mongoose";

// const carritoCollection = "carrito";
// let lastId = 0;
// const carritoSchema = new mongoose.Schema({
//   _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  
//   products: [{ 
//     id: { type: Number, required: true, unique: true, default: () => ++lastId },
//     titulo: { type: String, required: true },
//     descripcion: { type: String, required: true },
//     price: { type: Number, required: true },
//     quantity: { type: Number, required: true, default: 1 }
//   }]
// });

// const carritoModel = mongoose.model(carritoCollection, carritoSchema);

// export default carritoModel;



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
        }
      }
    ],
    default: []
},

});

const carritoModel = mongoose.model(carritoCollection, carritoSchema);

export default carritoModel;





