import productoModel from "./models/productModel.js";

class MongoDAO {
  constructor(){}

  async createProduct(productData) {
    console.log("mongo dao")
    return await productoModel.create(productData);
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

export default MongoDAO;
