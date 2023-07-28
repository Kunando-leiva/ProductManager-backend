import productoModel from "../models/product.js";
import mongoose from 'mongoose';

class ProductosManager {

//metodo para obtener todos los productos  
async getProductos(page , limit) {
try {
  const limitNumber = parseInt(limit);
  if (isNaN(limitNumber) || limitNumber < 1) {
    limit =20;
  }
  const productos = await productoModel.paginate({}, { page, limit, lean: true });
  return productos;
} catch (error) {
  console.error('Error al obtener los productos:', error);
  throw error;
}
}
                                                
                                                

                                               //get explain(index query para ver el tiempo de respuesta de la consulta)
  async explain() {
    try{
      const productos = await productoModel.find().explain("executionStats");
      return productos;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
}


                                                                 //metodo para obtener un producto por id
async getProductoById(productoId) {
  try {
    // Verificar si productoId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      throw new Error(`El valor '${productoId}' no es un ObjectId válido.`);
    }

    // Convierte productoId en un ObjectId válido
    const objectIdProductoId = new mongoose.Types.ObjectId(productoId);

    const producto = await productoModel.findById(objectIdProductoId);
    return producto;
  } catch (error) {
    throw new Error('Error al obtener el producto: ' + error.message);
  }
}


                                                                        //metodo para crear un producto
  async createProducto(producto) {
    try {
      
      const createProducto = await productoModel.create(producto);
      return createProducto;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  }

                                                                        //metodo para actualizar un producto
  async updateProducto(id, producto) {
    try {
      const updatedProducto = await productoModel.findByIdAndUpdate(id, producto, { new: true });
      return updatedProducto;
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
      throw error;
    }
  }

                                                                              //metodo para eliminar un producto
async deleteProducto(id) {
  try {
    const deletedProducto = await productoModel.findByIdAndDelete(id);
    if (!deletedProducto) {
      throw new Error(`Producto con ID ${id} no encontrado en la base de datos`);
    }
    return deletedProducto; // Retornar el producto eliminado
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
}




}
export default ProductosManager;














