import ProductDTO from "../DTOs/ProductDTO.js";


class ProductsRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async createProduct(productInfo) {
      try {
        console.log("Desde el repositorio de productos");
        const newProductInfo = new ProductDTO(productInfo);
  
        const product = await this.dao.createProduct(newProductInfo);
        return ("producto reposi",product); // Ajusta lo que devuelves según tu necesidad
      } catch (error) {
        throw error;
      }
    }
  
    async getProductById(id) {
      try {
        console.log("Desde el repositorio de productos");
        const product = await this.dao.getProductById(id);
        return new ProductDTO(product);
      } catch (error) {
        throw error;
      }
    }
  
    async getAllProducts() {
      try {
        console.log("Desde el repositorio de productos");
        const products = await this.dao.getAllProducts();
        return products.map(product => new ProductDTO(product));
      } catch (error) {
        throw error;
      }
    }
  
    async updateProduct(id, updateData) {
      try {
        console.log("Desde el repositorio de productos");
        const updatedProduct = await this.dao.updateProduct(id, updateData);
        return new ProductDTO(updatedProduct);
      } catch (error) {
        throw error;
      }
    }
  
    async deleteProduct(id) {
      try {
        console.log("Desde el repositorio de productos");
        await this.dao.deleteProduct(id);
      } catch (error) {
        throw error;
      }
    }
  
    // Agrega más métodos según tus necesidades
  }
  
  export default ProductsRepository;
