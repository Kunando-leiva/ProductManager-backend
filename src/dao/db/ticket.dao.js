import TicketModel from './models/ticket.Model.js'; 
class TicketDAO {

  static async createTicket(ticketData) {
    try {
      const newTicket = await TicketModel.create(ticketData);
      return newTicket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }

  
  static async getTicketByCode(code) {
    try {
      const ticket = await TicketModel.findOne({ code });
      return ticket;
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }


}

export default TicketDAO;
