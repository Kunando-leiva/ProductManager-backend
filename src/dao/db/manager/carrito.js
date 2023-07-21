import carritoModel from "../models/carts.js";
import productoManager from "./producto.js";

const ProductosManager = new productoManager();
class CarritoManager {

    async createCarrito() {
      try {
    
        const carrito = await carritoModel.create({}).lean();
        return carrito;
      } catch (error) {
        console.error('Error al crear el carrito:', error);
        throw new Error('Error al crear el carrito: ' + error.message);
      }
    }
  
    async getCarritoById(carritoId) {
      try {
        const carrito = await carritoModel.findById(carritoId);
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
    
        // Obtener los detalles del producto usando la instancia de ProductosManager
        const producto = await ProductosManager.getProductoById(productoId);
        if (!producto) {
          throw new Error(`No se encontró el producto con ID ${productoId}`);
        }
    
        // Agregar el producto al carrito con la cantidad especificada
        carrito.productos.push({ producto, cantidad });
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
    
        const productIndex = carrito.productos.findIndex(product => product._id == productId);
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

    //obtener todos los carritos
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
