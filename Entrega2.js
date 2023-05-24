const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.products = [];
    this.lastId = 0;
    this.path = path;
    this.cargarData();
  }

  cargarData() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
      this.lastId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
    } catch (error) {
      this.products = [];
      this.lastId = 0;
    }
  }

  GuardarData() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error('Faltan atributos del producto');
    }
    if (this.products.some(product => product.code === code)) {
      throw new Error('El código de producto ya existe');
    }

    const product = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(product);
    this.GuardarData();

    return product.id;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(productId, updatedFields) {
    const product = this.getProductById(productId);
    Object.assign(product, updatedFields);
    this.GuardarData();
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);

    if (index === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(index, 1);
    this.GuardarData();
  }
  
  

}

const productManager = new ProductManager('products.json');

const products = productManager.deleteProduct();



console.log(products)
