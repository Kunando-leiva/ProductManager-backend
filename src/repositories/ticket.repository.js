import Ticket from '../dao/db/models/ticket.Model.js'; 

class TicketRepository {
  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }

  async getTicketById(id) {
    return await Ticket.findById(id);
  }

}

export default TicketRepository;
