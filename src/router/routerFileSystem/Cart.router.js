import { Router } from "express";
import CartManager from '../../dao/FileSystem/cartManager.js';
import ProductManager from "../../dao/FileSystem/ProductManager.js";


const router = Router();
const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carritos.json', productManager);


// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  try {
    const cartId = cartManager.createCart();
    res.status(201).json(cartManager.getCartById(cartId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Ruta para obtener los productos de un carrito específico
router.get('/:cartId', (req, res) => {
  try {
    const { cartId } = req.params;
    const products = cartManager.getCartProducts(cartId);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un producto a un carrito específico
router.post('/:cartId/product/:productId', (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const products = cartManager.addProductToCart(cartId, productId, quantity);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para obtener todos los carritos
router.get('/', (req, res) => {
  try {
    const carts = Object.values(cartManager.carts);
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
