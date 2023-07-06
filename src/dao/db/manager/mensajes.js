import MensajesModel from '../models/messages.js';

class MensajeManager {
  async getMensajes() {
    try {
      const mensajes = await MensajesModel.find().lean();
      return mensajes;
    } catch (error) {
      throw new Error('Error al obtener los mensajes: ' + error.message);
    }
  }

  async createMensaje(data) {
    try {
      const mensaje = await MensajesModel.create(data);
      return mensaje;
    } catch (error) {
      throw new Error('Error al crear el mensaje: ' + error.message);
    }
  }

  

}


export default MensajeManager;
