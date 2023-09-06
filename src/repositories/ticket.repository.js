// ticket.repository.js
import Ticket from '../dao/db/models/ticket.Model.js'; // Asegúrate de proporcionar la ruta correcta

class TicketRepository {
  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getTicketById(id) {
    return await Ticket.findById(id);
  }

  // Implementa las operaciones restantes para actualizar y eliminar tickets, al igual que la lógica correspondiente.

  // Puedes agregar más métodos según sea necesario.
}

export default TicketRepository;
