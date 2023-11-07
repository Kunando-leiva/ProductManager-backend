import productoModel from "./models/productModel.js";

class productosDAO {
  constructor(){}

  async createProduct(productInfo) {
    console.log("mongo dao")
    return await productoModel.create(productInfo);
  }

  async getProductById(id) {
    return productoModel.findById(id);
  }

  async getAllProducts() {
    return productoModel.find().lean();
  }

  async updateProduct(id, updateData) {
    return productoModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteProduct(id) {
    return productoModel.findByIdAndDelete(id);
  }

  async getProductByCode(code) {
    try {
      const product = await productoModel.findOne({ code }).lean();
      return product;
    } catch (error) {
      throw error;
    }
  }

  
}

export default productosDAO;
