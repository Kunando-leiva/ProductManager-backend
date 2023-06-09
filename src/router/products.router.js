import { Router } from "express";  
import ProductManager from '../ProductManager.js';
import CartManager from '../cartManager.js';

const router = Router();
const productManager = new ProductManager('products.json');
const cartManager = new CartManager('carritos.json', productManager);


  router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      const product = productManager.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  
  router.post('/', (req, res) => {
    const { id, title, description, code, price, stock, category, thumbnails, status } = req.body;
  
    try {
      const productId = productManager.addProduct(
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      );
      res.json({ id: productId });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const updatedFields = req.body;
  
    try {
      productManager.updateProduct(productId, updatedFields);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  

  router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
  
    try {
      productManager.deleteProduct(productId);
      res.sendStatus(200);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  
  router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit) || 15;
  
    const products = productManager.getProducts(); // Obtener los productos desde el ProductManager
  
    const limitedProducts = products.slice(0, limit);
  
    res.json(limitedProducts);
  });
  


export default router;