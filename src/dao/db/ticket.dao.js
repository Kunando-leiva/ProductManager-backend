import TicketModel from './models/ticket.Model.js'; // Ajusta la ruta a donde tengas el modelo TicketModel

class TicketDAO {
  // Crear un nuevo ticket en la base de datos
  static async createTicket(ticketData) {
    try {
      const newTicket = await TicketModel.create(ticketData);
      return newTicket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }

  // Obtener información de un ticket por su código
  static async getTicketByCode(code) {
    try {
      const ticket = await TicketModel.findOne({ code });
      return ticket;
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }

  // Realizar otras operaciones de acceso a la base de datos relacionadas con los tickets
}

export default TicketDAO;
