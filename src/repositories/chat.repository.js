import chatDTO from "../DTOs/ChatDTO.js";

class ChatRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createMensaje(mensajeData) {
    try {
      const nuevoMensaje = await this.dao.createMensaje(mensajeData);
      return chatDTO.createMensajeDTO(nuevoMensaje);
    } catch (error) {
      throw error;
    }
  }

  async getMensajes() {
    try {
      const mensajes = await this.dao.getMensajes();
      return mensajes.map((mensaje) => chatDTO.createMensajeDTO(mensaje));
    } catch (error) {
      throw error;
    }
  }
}

export default ChatRepository;
