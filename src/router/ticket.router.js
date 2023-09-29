import express from 'express';
import TicketController from '../controllers/Ticket/Ticket.controller.js';

const router = express.Router();
const ticketController = new TicketController();

router.post('/', ticketController.createTicket.bind(ticketController));



export default router;