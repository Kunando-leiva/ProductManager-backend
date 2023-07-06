import { Router } from "express";
import { Server } from "socket.io";
import ProductManager from '../../dao/FileSystem/ProductManager.js';


const io = new Server();
const router = Router();
const productManager = new ProductManager('products.json');



router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});


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
      price,
      stock,
      category,
      code,
      thumbnails,
      status,
    );
    
    const product = productManager.getProductById(productId); 
    res.json({ id: productId });
    io.emit('productCreated', product); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  console.log(req.body);
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
    
    try {
      io.emit('productDeleted', productId);
    } catch (error) {
      console.error('Error al emitir evento de producto eliminado:', error);
    }
    res.json({ message: 'Producto eliminado correctamente' }); 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit) || 30;

  const products = productManager.getProducts(); 

  const limitedProducts = products.slice(0, limit);

  res.json(limitedProducts);
});

export default router;
