import productoModel from "../models/product.js";

class ProductosManager {

//metodo para obtener todos los productos  
  async getProductos() {
    try {
      const productos = await productoModel.find().lean();
      return productos;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }


//metodo para obtener un producto por id
  async getProductoById(id) {
    try {
      const producto = await productoModel.findById(id).lean();
      return producto;
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error;
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
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
}

}



export default ProductosManager;














