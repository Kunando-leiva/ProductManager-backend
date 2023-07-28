import express from 'express';
import ProductosManager from '../dao/db/manager/producto.js';



const router = express.Router();
const productosManager = new ProductosManager();

let lastId = 0;

// Obtener todos los productos y renderizar la vista
router.get("/home.handlebars", async (req, res) => {
  try {
    const productos = await productosManager.getProductos();

    // Datos adicionales que deseas pasar a la vista
    const data = {
      name: "pony pisador",
      description: "El mejor lugar para comprar tus productos de la Tierra Media",
      role: "user",
    };

    res.render("home.handlebars", {
      data,
      style: "styles.css",
      isAdmin: data.role === "user",
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      currentPage: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.prevLink,
      nextLink: productos.nextLink,
      productos: productos.docs, // productos es un objeto que contiene una propiedad "docs" con el array de productos
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
});




// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await productosManager.getProductoById(id);
    if (!producto) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'ok', producto });
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    res.status(500).json({ status: 'error', message: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category, stock, code, thumbnail } = req.body;
    if (!title || !description || !price || !category || !stock || !code || !thumbnail ) {
      return res.status(400).json({ status: 'error', message: 'Faltan datos' });
    }
  
    lastId++;
    const producto = {
      ...req.body,
      id: lastId,
    };
    const createProducto = await productosManager.createProducto(producto);
    res.status(201).json({ status: 'ok', producto: createProducto });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear el producto' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ status: 'error', message: 'Faltan datos' });
    }
    const updatedProducto = await productosManager.updateProducto(id, req.body);
    if (!updatedProducto) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'ok', producto: updatedProducto });
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    res.status(500).json({ status: 'error', message: 'Error al actualizar el producto' });
  }
});


// Eliminar un producto
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).json({ status: 'error', message: 'Faltan datos' });
    }
    const deletedProduct = await productosManager.deleteProducto(id);
    if (!deletedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'ok', producto: deletedProduct });
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
  }
});


export default router;
