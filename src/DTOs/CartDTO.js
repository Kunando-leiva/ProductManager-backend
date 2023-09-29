class CartDTO {
    constructor(cartData) {
      this.id = cartData._id;
      this.products = cartData.productos.map(product => ({
        productId: product.producto._id,
        quantity: product.quantity,
        
      }));
    }
  }
  
  export default CartDTO;
  