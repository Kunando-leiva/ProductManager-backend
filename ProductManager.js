class ProductManager {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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

    return product.id;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }
}

const product = new ProductManager();

product.addProduct("vino", "malbec", 800, "https://vinotecaligier.com/media/catalog/product/cache/1/image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/e/be71380_base-.jpg", 1, 50);
product.addProduct("vino", "blanco", 500, "https://vinotecaligier.com/media/catalog/product/cache/1/image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/e/be71380_base-.jpg", 2, 40);
product.addProduct("cerveza", "honey", 250, "https://vinotecaligier.com/media/catalog/product/cache/1/image/1000x/9df78eab33525d08d6e5fb8d27136e95/b/e/be71380_base-.jpg", 3, 80);

const products = product.getProducts();
console.log(products);

const productId = 4;
const foundProduct = product.getProductById(productId);

console.log(foundProduct);