import mongoose from "mongoose";
import { token } from "morgan";

const collection = "Users";

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String},
    email: { type: String, unique: true },
    age: { type: Number, default: 0 },
    password: { type: String},
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carts' }],
    role: { type: String },
    token: { type: String }
});

const userModel = mongoose.model(collection, userSchema);

export default userModel;