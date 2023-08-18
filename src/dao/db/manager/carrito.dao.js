import carritoModel from "../models/cartsModel.js";
import productoModel from "../models/productModel.js";


class CarritoManager {
  async createCarrito() {
    try {
      
    
      const carrito = await carritoModel.create({ productos: [] });
      await carrito.save();
      return carrito;
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      throw new Error('Error al crear el carrito: ' + error.message);
    }
  }

  async getCarritoById(carritoId) {
    try {
      const carrito = await carritoModel
        .findById(carritoId)
        .populate('productos.producto', '-__v') // Populate para obtener los detalles de los productos
        .lean();

      return carrito;
    } catch (error) {
      throw new Error('Error al obtener el carrito: ' + error.message);
    }
  }

  async addProductToCarrito(carritoId, productoId, cantidad) {
    try {
      const carrito = await carritoModel.findById(carritoId);
      if (!carrito) {
        throw new Error(`No se encontró el carrito con ID ${carritoId}`);
      }

      const producto = await productoModel.findById(productoId);
      if (!producto) {
        throw new Error(`No se encontró el producto con ID ${productoId}`);
      }

      carrito.productos.push({ producto: productoId, cantidad });
      await carrito.save();

      console.log(`Producto con ID ${productoId} agregado al carrito`);
      return carrito;
    } catch (error) {
      console.error(`Error al agregar el producto con ID ${productoId} al carrito:`, error);
      throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  }

  async deleteProductFromCarrito(carritoId, productId) {
    try {
      const carrito = await carritoModel.findById(carritoId);
      if (!carrito) {
        throw new Error(`No se encontró el carrito con ID ${carritoId}`);
      }

      const productIndex = carrito.productos.findIndex(product => product.producto == productId);
      if (productIndex === -1) {
        throw new Error(`No se encontró el producto con ID ${productId} en el carrito`);
      }

      carrito.productos.splice(productIndex, 1);
      await carrito.save();

      console.log(`Producto con ID ${productId} eliminado del carrito`);
      return carrito;
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${productId}:`, error.message);
      throw new Error(`Error al eliminar el producto con ID ${productId}: ${error.message}`);
    }
  }

  async getCarritos() {
    try {
      const carritos = await carritoModel.find().lean();
      return carritos;
    } catch (error) {
      console.error('Error al obtener los carritos:', error);
      throw error;
    }
  }
}

export default CarritoManager;
