import productoModel from "../models/productModel.js";

class ProductoDao {
  constructor() {}

  //metodo para obtener todos los productos
  async getProducts() {
    try {
      const productos = await productoModel.find();
      console.log("si ahy productos son estos",productos);
    } catch (error) {
      throw new Error("Error al obtener los productos: " + error.message);
    }
   
  }

  async getProductById(id) {
    try {
      const producto = await productoModel.findById(id);
      return producto;
    } catch (error) {
      throw new Error("Error al obtener el producto: " + error.message);
    }
  }

  async createProducto(producto) {
    try {
      const newProducto = await productoModel.create(producto);
      return newProducto;
    } catch (error) {
      throw new Error("Error al crear el productoffff: " + error.message);
    }
  }

  async updateProduct(id, producto) {
    try {
      const updatedProducto = await productoModel.findByIdAndUpdate(
        id,
        producto,
        { new: true }
      );
      return updatedProducto;
    } catch (error) {
      throw new Error("Error al actualizar el producto: " + error.message);
    }
  }





}

export default ProductoDao;

