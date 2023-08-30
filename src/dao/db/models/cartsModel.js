
import mongoose from 'mongoose';

const collectionCart = 'carritos';

const CartSchema = new mongoose.Schema({

  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true },
    quantity: { type: Number, default: 1 },
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  
 
});

export default mongoose.model(collectionCart, CartSchema);






