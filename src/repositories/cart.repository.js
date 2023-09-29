import CartDTO from "../DTOs/CartDTO.js";

class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createCart(cartInfo) {
    const { cid } = req.params;
    try {
      const newCartDTO = new CartDTO(cartInfo);
      const cart = await this.dao.createCart(newCartDTO);
      return cart; 
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.dao.addProductToCart(cartId, productId, quantity);
      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await this.dao.deleteProductFromCart(cartId, productId);
      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }
      return new CartDTO(cart);
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.dao.getCarts();
      return carts.map(cart => new CartDTO(cart));
    } catch (error) {
      throw error;
    }
  }


}

export default CartRepository;
