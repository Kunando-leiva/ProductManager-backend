import express from 'express';
import CarritoManager from '../dao/db/manager/carrito.js';
import ProductosModel from '../dao/db/models/product.js';
import carritoModel from '../dao/db/models/carts.js';

const router = express.Router();
const carritoManager = new CarritoManager();

// Crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const carrito = await carritoManager.createCarrito();
    res.status(201).json({ status: 'ok', carrito });
  } catch (error) {
    console.error('Error al crear el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
  }
});

// Obtener un carrito por su ID
router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const carrito = await carritoManager.getCarritoById(cid);
    res.status(200).json({ status: 'ok', carrito });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post("/:cid/producto", async (req, res) => {
  const { cid } = req.params; // Obtener el ID del carrito desde el parámetro de ruta
  const { productoId } = req.body; // Obtener el ID del producto de la solicitud

  try {
    const carrito = await carritoModel.findOne({ _id: cid }).populate("productos.producto");
    const producto = await ProductosModel.findOne({ _id: productoId });
    console.log(JSON.stringify(carrito, null, 2));

    if (!carrito) {
      console.log("No se encontró el carrito.");
      return res.status(404).json({ status: "error", message: "No se encontró el carrito" });
    }

    if (!producto) {
      console.log("No se encontró el producto.");
      return res.status(404).json({ status: "error", message: "No se encontró el producto" });
    }

    const productoEnCarrito = carrito.productos.find(item => item.producto && item.producto.equals(producto._id));
    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, incrementar la cantidad (quantity) en 1
      productoEnCarrito.quantity++;
    } else {
      // Si el producto no está en el carrito, agregarlo con quantity inicial de 1
      carrito.productos.push({ producto: producto, quantity: 1 });
    }

    await carrito.save();
    console.log("Producto agregado al carrito exitosamente.");

    const carritoJson = JSON.stringify(carrito, null, 2);
    console.log(carritoJson);

    res.status(200).json({ status: "ok", carrito });
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
    res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito" });
  }
});


// Obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carritos = await carritoManager.getCarritos();
    res.status(200).json({ status: 'ok', carritos });
    
  } catch (error) {
    console.error('Error al obtener los carritos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los carritos' });
  }
});

// Eliminar un producto del carrito
router.delete('/:cid/producto/:pid', async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const carrito = await carritoManager.deleteProductFromCarrito(cid, pid);
    res.status(200).json({ status: 'ok', carrito });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
  }
});

export default router;
