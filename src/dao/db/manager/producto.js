import productoModel from "../models/product.js";

export default class ProductosManager {
  getProducto() {
    return productoModel.find().lean();
  }
     
  getProductoById(id) {
    return productoModel.findById(id);
  }

  createProducto(product) {
    return productoModel.create(product);
  }
    
  updateProducto(id, product) {
    return productoModel.findByIdAndUpdate(id, product);
  }

  deleteProducto(id) {
    return productoModel.findByIdAndDelete(id);
  }
}



















