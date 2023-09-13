class productManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  async createProduct(newProducInfo) {
    try{
      this.products.push(newProducInfo)

    console.log("memory dao");
    return newProducInfo;
    } catch(error){
      return error
    }
  }

  async getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  async getAllProducts() {
    return this.products;
  }

  async updateProduct(id, updateData) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    Object.assign(product, updateData);
    this.GuardarData();
    return product;
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(index, 1);
    this.GuardarData();
  }

  // Agrega más métodos según tus necesidades
}

export default productManager;


