class MensajeDaoMemory {
    constructor() {
      this.mensajes = [];
    }
  
    async createMensaje(mensajeData) {
      try {
        const nuevoMensaje = { ...mensajeData, _id: this.mensajes.length + 1 };
        this.mensajes.push(nuevoMensaje);
        return nuevoMensaje;
      } catch (error) {
        throw new Error('Error al crear el mensaje en memoria: ' + error.message);
      }
    }
  
    async getMensajes() {
      try {
        return [...this.mensajes];
      } catch (error) {
        throw new Error('Error al obtener los mensajes en memoria: ' + error.message);
      }
    }
  }
  
  export default MensajeDaoMemory;
  