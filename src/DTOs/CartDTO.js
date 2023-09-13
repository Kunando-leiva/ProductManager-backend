class CartDTO {
    constructor(cartData) {
      this.id = cartData._id;
      this.products = cartData.productos.map(product => ({
        productId: product.producto._id,
        quantity: product.quantity,
        // Agrega otros campos si es necesario
      }));
    }
  }
  
  export default CartDTO;
  