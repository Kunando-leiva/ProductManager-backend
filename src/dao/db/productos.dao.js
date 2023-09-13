import productoModel from "./models/productModel.js";

class productosDAO {
  constructor(){}

  async createProduct(productDTO) {
    console.log("mongo dao")
    return await productoModel.create(productDTO);
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

export default productosDAO;
