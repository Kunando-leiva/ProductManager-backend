import mongoose from 'mongoose';

const mensajeCollection = 'mensaje';

const mensajeSchema = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
  });
      


const mensajesModel = mongoose.model(mensajeCollection, mensajeSchema);

export default mensajesModel;