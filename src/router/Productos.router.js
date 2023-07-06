import  express  from 'express';
import ProductosManager from '../dao/db/manager/producto.js';
import { Server } from 'socket.io';

const io = new Server();

const router = express.Router();
const productoManager = new ProductosManager();



router.get('/', async (req, res) => {
    const productos = await productoManager.getProductos();
    res.json({ status: "ok", productos });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const producto = await productoManager.getProductoById(id);
    res.json({ status: "ok", producto });
});

router.post('/', async (req, res) => {
    try {
      const { title, description, price, stock, category, code, thumbnail } = req.body;
      if (!title || !description || !price || !stock || !category || !code || !thumbnail) {
        return res.status(400).json({ status: "error", message: "Faltan datos" });
      }
      const producto = req.body;
      const createProducto = await productoManager.createProducto(producto);
      res.status(201).json({ status: "ok", createProducto });
      io.emit('nuevoProducto', createProducto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error al crear el producto" });
    }
  });
  

  router.put('/:id', async (req, res) => {
    try {
      const { title, description, price, stock, category, code, thumbnail } = req.body;
      if (!title || !description || !price || !stock || !category || !code || !thumbnail) {
        return res.status(400).json({ status: "error", message: "Faltan datos" });
      }
      const { id } = req.params;
      const newProduct = req.body;
      await productoManager.updateProducto(id, newProduct);
      res.json({ status: "ok", newProduct });
      io.emit('productoActualizado', newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error al actualizar el producto" });
    }
  });
  

router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await productoManager.deleteProducto(id);
      res.sendStatus(204);
      console.log("Producto eliminado");
      io.emit('productoEliminado', id);
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error al eliminar el producto" });
    }
  });
  




export default router;