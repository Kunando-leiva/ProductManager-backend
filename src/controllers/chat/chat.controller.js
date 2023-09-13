
class ChatController {
  constructor(chatRepositoryIndex) {
    this.chatRepositoryIndex = chatRepositoryIndex

  }

  async createMensaje(req, res) {
    const { user, message } = req.body;
    console.log('createMensaje user:', user);
    console.log('createMensaje message:', message);

    if (!user || !message) {
      console.log('Faltan datos del mensaje');
      return res.status(400).json({ status: 'error', message: 'Faltan datos del mensaje' });
    }

    try {
      const nuevoMensaje = await this.chatRepositoryIndex.createMensaje({ user, message });
      console.log('Mensaje creado con éxito:', nuevoMensaje);
      res.status(201).json({ status: 'ok', mensaje: nuevoMensaje });
    } catch (error) {
      console.error('Error al crear el mensaje:', error);
      res.status(500).json({ status: 'error', message: 'Error al crear el mensaje' });
    }
  }


  async getMensajes(req, res) {
    try {
      const mensajes = await this.chatRepositoryIndex.getMensajes();
      res.status(200).json({ status: 'ok', mensajes });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error al obtener los mensajes' });
    }
  }
}

export default ChatController;
