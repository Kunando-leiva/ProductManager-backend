import express from 'express';
import Producto from '../dao/db/manager/producto.js';
import ProductosModel from '../dao/db/models/product.js';

const router = express.Router();
const ProductosManager = new Producto();


let lastId = 0;

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query; // Obtener parámetros de consulta para paginación

    // Realizar la consulta de productos paginados
    const options = { page: parseInt(page), limit: parseInt(limit) };
    const productos = await ProductosModel.paginate({}, options);
    console.log('productos', productos);  

    res.status(200).json({ status: 'success', data: productos });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
});


// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const producto = await ProductosManager.getProductoById(id);
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
    const createProducto = await ProductosManager.createProducto(producto);
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
    const updatedProducto = await ProductosManager.updateProducto(id, req.body);
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
    const deletedProduct = await ProductosManager.deleteProducto(id);
    if (!deletedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'ok', producto: deletedProduct });
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
  }
});

//filtro de productos por categoria

router.get('/', async (req, res) => {
  try {
    const { category = 'comida' } = req.query;

    const filtro = await ProductosModel.aggregate([
      {
        $match: { category: { $regex: category, $options: 'i' } }
      },
      {
        $group: { _id: '$title', totalprice: { $sum: '$price' } }
      },
      {
        $sort: { totalstock: -1 }
      },
      {
        $group: { _id: 1, filtro: { $push: '$$ROOT' } }
      },
      {
        $project: { "_id": 0, filtro: "$filtro" }
      }
    ]);

    console.log('filtro', filtro);

    res.json(filtro);
  } catch (error) {
    console.error('Error al ejecutar la operación de agregación:', error);
    res.status(500).json({ error: 'Error al ejecutar la operación de agregación' });
  }
});



//ver los productos de la base de datos y con filtro ProductosModel.find({}).where("category").equals("comida") .explain("executionStats");


  

export default router;
