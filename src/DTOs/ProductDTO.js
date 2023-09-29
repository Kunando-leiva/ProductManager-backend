class ProductDTO {
    constructor(product) {
      this.title = product.title;
      this.description = product.description;
      this.price = product.price;
      this.code = product.code.replace(/\s/g, '');
      this.category = product.category;
      this.stock = product.stock;
      this.status = true; 
     console.log("Usando el DTO de producto"); 
    }
  }
  
  export default ProductDTO;