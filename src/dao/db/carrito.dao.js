import CartModel from "./models/cartsModel.js";
import ProductModel from "./models/productModel.js";

class CartDao {
  async createCart(cartData) {
    const newCart = await CartModel.create(cartData);
    return newCart;
  }

  async getCartById(cartId) {
    const cart = await CartModel.findById(cartId).populate('productos.producto');
    return cart;
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      
      const cart = await CartModel.findById(cartId);

      if (!cart) {
        throw new Error('Cart not found');
      }

     
      const existingProductIndex = cart.productos.findIndex(product => product.producto.equals(productId));
      
      
      if (existingProductIndex !== -1) {
        
        cart.productos[existingProductIndex].quantity += quantity;
      } else {
       
        const newProduct = {
          producto: productId,
          quantity,
          
        };
        cart.productos.push(newProduct);
      }

      
      await cart.save();

      return cart;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito: ' + error.message);
    }
  }
  

  async deleteProductFromCart(cartId, productId) {
    const updatedCart = await CartModel.findByIdAndUpdate(
      cartId,
      {
        $pull: { productos: { producto: productId } },
      },
      { new: true }
    ).populate('productos.producto');

    return updatedCart;
  }

  async getCarts() {
    const carts = await CartModel.find().populate('productos.producto');
    return carts;
  }
}

export default CartDao;
























































