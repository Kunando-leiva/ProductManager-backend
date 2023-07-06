import express from 'express';
import CarritoManager from '../dao/db/manager/carrito.js';

const router = express.Router();
const carritoManager = new CarritoManager();


// Obtener todos los carritos



// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const carrito = await carritoManager.createCarrito();
    res.status(201).json({ status: 'ok', carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
  }
});

// Obtener un carrito por su ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const carrito = await carritoManager.getCarritoById(id);
    res.render('carrito', { carrito });
    res.status(200).json({ status: 'ok', carrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/:carritoId/productos', async (req, res) => {
  const { carritoId } = req.params;
  const { id, titulo, descripcion, price } = req.body;

  if (!id || !titulo || !descripcion || !price) {
    return res.status(400).json({ status: 'error', message: 'Faltan datos del producto' });
  }

  try {
    const product = { id, titulo, descripcion, price };
    const updatedCarrito = await carritoManager.addProductToCarrito(carritoId, product);
    res.status(200).json({ status: 'ok', carrito: updatedCarrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/:carritoId/productos/:productId', async (req, res) => {
  const { carritoId, productId } = req.params;

  try {
    const updatedCarrito = await carritoManager.removeProductFromCarrito(carritoId, productId);
    res.status(200).json({ status: 'ok', carrito: updatedCarrito });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
  }
});

export default router;
