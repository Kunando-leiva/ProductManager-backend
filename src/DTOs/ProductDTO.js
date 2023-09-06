class ProductDTO {
    constructor(producto) {
      this.name = producto.title;
      this.description = producto.description;
      this.price = producto.price;
      this.category = producto.category;
      this.stock = producto.stock;
      this.status = "user"; // Puedes establecer un valor predeterminado según tus necesidades
      console.log("Usando el DTO de producto");
    }
  }
  
  export default ProductDTO;