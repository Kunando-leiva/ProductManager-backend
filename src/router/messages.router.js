import customRouter from './router.js';

class mensajeManager extends customRouter {
  constructor() {
    super();
    this.init();
  }

  init() {
    // Crear un nuevo mensaje
    this.post('/mensajes', async (req, res) => {
      const { user, message } = req.body;

      if (!user || !message) {
        return res.status(400).json({ status: 'error', message: 'Faltan datos del mensaje' });
      }

      try {
        const nuevoMensaje = await this.createMensaje({ user, message }); // Usar 'this' en lugar de 'mensajeManager'
        res.status(201).json({ status: 'ok', mensaje: nuevoMensaje });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear el mensaje' });
      }
    });

    // Obtener todos los mensajes
    this.get('/mensajes', async (req, res) => { // Usar 'this' en lugar de 'messagesRouter'
      try {
        const mensajes = await this.getMensajes(); // Usar 'this' en lugar de 'mensajeManager'
        res.status(200).json({ status: 'ok', mensajes });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener los mensajes' });
      }
    });
  }
}

export default mensajeManager;