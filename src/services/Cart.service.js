import mongoose from 'mongoose';

class CartService {
    constructor(CartDao, ProductDao) {
      this.CartDao = CartDao;
      this.ProductDao = ProductDao;
    }
  
    async createCart(cartData) {
      const newCart = await this.CartDao.createCart(cartData);
      return newCart;
    }
  
    async getCartById(cartId) {
      const cart = await this.CartDao.getCartById(cartId);
      return cart;
    }
  
    async addProductToCart(cartId, productId, quantity) {
      console.log("cartId:", cartId);
      console.log("productId:", productId);
      if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new Error('IDs inválidos');
      }
      const updatedCart = await this.CartDao.addProductToCart(cartId, productId, quantity);
      return updatedCart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito: ' + error.message);
    }
  
    async deleteProductFromCart(cartId, productId) {
      const updatedCart = await this.CartDao.deleteProductFromCart(cartId, productId);
      return updatedCart;
    }
  
    async getCarts() {
      const carts = await this.CartDao.getCarts();
      return carts;
    }

    static async removeProducts(req, res) {
      try {
        const { userId, productIds } = req.body;
        await CartService.removeProductsFromCart(userId, productIds);
        res.json({ message: 'Productos eliminados del carrito exitosamente' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
  
  export default CartService;
  