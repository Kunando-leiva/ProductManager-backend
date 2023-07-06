import mongoose from "mongoose";

const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
  products: [{ 
    id: { type: Number, required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  }]
});

const carritoModel = mongoose.model(carritoCollection, carritoSchema);

export default carritoModel;
