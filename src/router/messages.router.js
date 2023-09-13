import express from "express";
import ChatController from "../controllers/chat/chat.controller.js"
import chatDao from "../dao/factory.chat.js";

const router = express.Router();

const chatController = new ChatController(chatDao)

router.get("/vistamensaje", chatController.getMensajes.bind(chatController));
router.post("/", chatController.createMensaje.bind(chatController));

export default router;

// class mensajeManager  {
//   constructor() {

//     this.init();
//   }






//   init() {
//     // Crear un nuevo mensaje
//     this.post('/mensajes', async (req, res) => {
//       const { user, message } = req.body;

//       if (!user || !message) {
//         return res.status(400).json({ status: 'error', message: 'Faltan datos del mensaje' });
//       }

//       try {
//         const nuevoMensaje = await this.createMensaje({ user, message }); // Usar 'this' en lugar de 'mensajeManager'
//         res.status(201).json({ status: 'ok', mensaje: nuevoMensaje });
//       } catch (error) {
//         res.status(500).json({ status: 'error', message: 'Error al crear el mensaje' });
//       }
//     });

//     // Obtener todos los mensajes
//     this.get('/mensajes', async (req, res) => { // Usar 'this' en lugar de 'messagesRouter'
//       try {
//         const mensajes = await this.getMensajes(); // Usar 'this' en lugar de 'mensajeManager'
//         res.status(200).json({ status: 'ok', mensajes });
//       } catch (error) {
//         res.status(500).json({ status: 'error', message: 'Error al obtener los mensajes' });
//       }
//     });
//   }
// }

// export default mensajeManager;