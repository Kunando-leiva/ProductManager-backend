import mongoose from "mongoose";
import AutoPopulate from "mongoose-autopopulate";


const collectionUsers = "Users";

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String},
    email: { type: String, unique: true },
    age: { type: Number, default: 0 },
    password: { type: String},
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carritos' }],
    role: { 
        type: String, 
        enum: ['user', 'admin', 'premium'],
    },
    token: { type: String }, 
    
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }, 
    documents: [
        {
            name: String,
            reference: String,
        }
    ],
    last_connection: { type: Date },

});
userSchema.plugin(AutoPopulate);

const userModel = mongoose.model(collectionUsers, userSchema);

export default userModel;