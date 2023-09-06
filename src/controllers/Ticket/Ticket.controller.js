import TicketRepository from '../../repositories/ticket.repository.js'; // Asegúrate de proporcionar la ruta correcta
import UserDao from '../../dao/db/users.dao.js';
import mongoose from 'mongoose';
import User from '../../dao/db/users.dao.js'; // Importa el modelo User
import Ticket from '../../dao/db/ticket.dao.js'; // Importa el modelo Ticket
import TicketModel from "../../dao/db/models/ticket.Model.js"

class TicketController {
  constructor() {
    this.ticketRepository = new TicketRepository();
    this.userDao = new UserDao();
  }

  async createTicket(req, res) {
    try {
      const { code, purchase_datetime, amount, purchaserId } = req.body;

      // Corrige la creación del ObjectId utilizando mongoose.Types.ObjectId()
      const purchaserObjectId = new mongoose.Types.ObjectId(purchaserId);

      const newTicket = new TicketModel({
        code,
        purchase_datetime,
        amount,
        purchaser: purchaserObjectId, // Asigna el ObjectId del comprador
      });

      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      res.status(500).json({ error: "Error creating ticket" });
    }
  }

  async addUserToTicket(req, res) {
    try {
      const { userId } = req.body;
      const ticketId = req.params.tid;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        { purchaser: user._id },
        { new: true }
      ).populate("purchaser"); // Utiliza populate para obtener el objeto de comprador completo

      if (updatedTicket) {
        res.json(updatedTicket);
      } else {
        res.status(404).json({ message: "Ticket not found" });
      }
    } catch (error) {
      console.error("Error adding user to ticket:", error);
      res.status(500).json({ error: "Error adding user to ticket" });
    }
  }
}

export default TicketController;
