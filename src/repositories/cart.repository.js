import cartInfo from "../dao/db/carrito.dao.js"

import ProductsDao from '../dao/db/productos.dao.js';

class CartRepository {
  constructor() {
    this.cartInfo = new cartInfo();
    this.productsDao = new ProductsDao();
  }

  async createCart(userId) {
    cartInfo.user = userId;
    return this.cartInfo.createCart(cartInfo);
  }
  
  

  async getCartById(cartId) {
    try {
      const cart = await this.cartInfo.getCartById(cartId);
      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.cartInfo.addProductToCart(cartId, productId, quantity);
      if (!cart) {
        throw new Error(`Cart not found with ID: ${cartId}`);
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
     
      const cart = await this.cartDao.getCartById(cartId);
      if (!cart) {
        return { status: 'error', message: `Cart not found with ID: ${cartId}` };
      }

      const product = await this.productsDao.getProductById(productId);
      if (!product) {
        return { status: 'error', message: `Product not found with ID: ${productId}` };
      }

      const updatedCart = await this.cartDao.deleteProductFromCart(cartId, productId);

      return { status: 'success', message: 'Product removed from cart', updatedCart };
    } catch (error) {
      return { status: 'error', message: 'Error deleting product from cart', error: error.message };
    }
  }

  async getCarts() {
    try {
      const carts = await this.cartInfo.getCarts();
      return carts;
    } catch (error) {
      throw error;
    }
  }
}

export default CartRepository;
