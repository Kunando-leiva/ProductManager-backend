import productoModel from "../models/productModel.js";

class ProductDao {
  async createProduct(productData) {
    return productoModel.create(productData);
  }

  async getProductById(id) {
    return productoModel.findById(id);
    
  }

  async getAllProducts() {
    return productoModel.find();
  }

  async updateProduct(id, updateData) {
    return productoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    return productoModel.findByIdAndDelete(id);
  }

  // Agrega más métodos según tus necesidades
}

export default ProductDao;
