import fs from 'fs';

class CartManager {
  constructor(path, productManager) {
    this.productManager = productManager;
    this.path = path;
    this.carts = {};
  }

  createCart() {
    const cartId = this.generateUniqueId();
    this.carts[cartId] = { id: cartId, products: [] };
    this.saveCarts();
    return cartId;
  }

  getCartById(cartId) {
    return this.carts[cartId];
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      throw new Error('La cantidad debe ser un número válido mayor que cero');
    }

    const product = { productId, quantity: parsedQuantity };
    const existingProduct = cart.products.find((p) => p.productId === productId);

    if (existingProduct) {
      existingProduct.quantity += parsedQuantity;
    } else {
      cart.products.push(product);
    }

    this.saveCarts();
    return cart.products;
  }

  getCartProducts(cartId) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const products = [];

    for (const cartProduct of cart.products) {
      const { productId, quantity } = cartProduct;
      const product = this.productManager.getProductById(productId);
      products.push({ product, quantity });
    }

    return products;
  }

  // Métodos adicionales que puedas necesitar para mantener la interfaz consistente
}

export default CartManager;
