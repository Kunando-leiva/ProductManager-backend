import TicketDAO from '../dao/db/manager/ticket.dao.js'; // Ajusta la ruta a donde tengas el DAO TicketDAO

class TicketService {
  // Crear un nuevo ticket
  static async createTicket(ticketData) {
    try {
      const newTicket = await TicketDAO.createTicket(ticketData);
      return newTicket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }

  // Obtener información de un ticket por su código
  static async getTicketByCode(code) {
    try {
      const ticket = await TicketDAO.getTicketByCode(code);
      return ticket;
    } catch (error) {
      throw new Error('Error al obtener el ticket: ' + error.message);
    }
  }

  static async updateCartAfterPurchase(userId, notProcessedProducts) {
    try {
      await CartService.removeProductsFromCart(userId, notProcessedProducts);
    } catch (error) {
      throw new Error('Error al actualizar el carrito: ' + error.message);
    }
  }

  
}

export default TicketService;
