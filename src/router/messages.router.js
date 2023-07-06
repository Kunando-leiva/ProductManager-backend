import express from 'express';
import MensajeManager from '../dao/db/manager/mensajes.js';
import { Server } from 'socket.io';
import e from 'express';

const router = express.Router();
const mensajeManager = new MensajeManager();

// Crear un nuevo mensaje
router.post('/mensajes', async (req, res) => {
  const { user, message } = req.body;

  if (!user || !message) {
    return res.status(400).json({ status: 'error', message: 'Faltan datos del mensaje' });
  }

  try {
    const nuevoMensaje = await mensajeManager.createMensaje({ user, message });
    res.status(201).json({ status: 'ok', mensaje: nuevoMensaje });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al crear el mensaje' });
  }
});

// Obtener todos los mensajes
router.get('/mensajes', async (req, res) => {
  try {
    const mensajes = await mensajeManager.getMensajes();
    res.status(200).json({ status: 'ok', mensajes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener los mensajes' });
  }
});


router.get('/mensajes', async (req, res) => {
  try {
    const mensajes = await Message.find().lean();
    res.status(200).json({ status: 'ok', mensajes });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener los mensajes' });
  }
});

export default router;