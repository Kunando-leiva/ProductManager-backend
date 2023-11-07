class ProductDTO {
  constructor(productos) {
    this.id = productos._id;
    this.title = productos.title;
    this.description = productos.description;
    this.price = productos.price;
    this.code = productos.code;
    this.category = productos.category;
    this.stock = productos.stock;
    this.status = true;
    this.quantity = 1
   
  }
}

export default ProductDTO;
