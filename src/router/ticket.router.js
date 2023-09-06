import express from 'express';
import TicketController from '../controllers/Ticket/Ticket.controller.js';

const router = express.Router();
const ticketController = new TicketController();

// Ruta para crear un ticket
router.post('/', ticketController.createTicket.bind(ticketController));

// Agrega más rutas según sea necesario

export default router;