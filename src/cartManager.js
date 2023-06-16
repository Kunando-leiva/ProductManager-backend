import fs from 'fs';
import ProductManager from './ProductManager.js';

class CartManager {
  constructor(path, productManager) {
    this.lastId = 0;
    this.carts = {};
    this.path = path;
    this.productManager = productManager;
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = {};
    }
  }

  saveCarts() {
    const data = JSON.stringify(this.carts, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  generateUniqueId() {
    const lastId = this.lastId.toString();
    const newId = parseInt(lastId) + 1;
    return newId.toString();
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
}

export default CartManager;