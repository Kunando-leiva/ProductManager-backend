import mongoose from 'mongoose';
import AutoPopulate from 'mongoose-autopopulate';

const collectionCart = 'carritos';

const CartSchema = new mongoose.Schema({
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'producto', required: true },
    quantity: { type: Number, default: 1 },
  }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }, 
});
CartSchema.plugin(AutoPopulate);


const cartsModel = mongoose.model(collectionCart, CartSchema);
export default cartsModel





