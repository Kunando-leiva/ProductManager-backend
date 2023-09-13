import MensajesModel from "./models/messagesModel.js";

class chatDao {
  
  async createMensaje(data) {
    try {
      const mensaje = await MensajesModel.create(data);
      return mensaje;
    } catch (error) {
      throw new Error('Error al crear el mensaje: ' + error.message);
    }
  }

async getMensajes() {
    try {
      const mensajes = await MensajesModel.find();
      return mensajes;
    } catch (error) {
      throw new Error('Error al obtener los mensajes: ' + error.message);
    }
  }
  

}


export default chatDao;
