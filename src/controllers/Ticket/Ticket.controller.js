import TicketService from '../../services/Tickect.service.js'; // Ajusta la ruta a donde tengas el servicio TicketService

class TicketController {
  // Controlador para crear un nuevo ticket
  static async createTicket(req, res) {
    try {
      const ticketData = req.body; // Supongamos que los datos del ticket están en el cuerpo de la solicitud
      const newTicket = await TicketService.createTicket(ticketData);
      res.status(201).json(newTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Controlador para obtener información de un ticket por su código
  static async getTicketByCode(req, res) {
    try {
      const code = req.params.code; // Supongamos que el código del ticket está en los parámetros de la URL
      const ticket = await TicketService.getTicketByCode(code);
      if (!ticket) {
        res.status(404).json({ error: 'Ticket no encontrado' });
      } else {
        res.json(ticket);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async generateTicket(req, res) {
    try {
      const { userId, cartItems } = req.body;

      const processedProducts = [];
      const notProcessedProducts = [];

      for (const cartItem of cartItems) {
        // Verificar disponibilidad del producto y procesar según corresponda
        // ...

        if (productAvailable) {
          processedProducts.push(cartItem.productId);
        } else {
          notProcessedProducts.push(cartItem.productId);
        }
      }

      if (processedProducts.length > 0) {
        const totalAmount = calculateTotalAmount(processedProducts);
        const ticketData = {
          code: generateUniqueCode(),
          amount: totalAmount,
          purchaser: userId,
        };
        const createdTicket = await TicketService.createTicket(ticketData);
        res.status(201).json(createdTicket);
      } else {
        res.status(400).json({ message: 'No se pudo generar el ticket' });
      }

      await TicketService.updateCartAfterPurchase(userId, notProcessedProducts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Otros controladores relacionados con los tickets
}

export default TicketController;
