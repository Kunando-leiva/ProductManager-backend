import CartModel from '../../dao/db/models/cartsModel.js';
import ProductModel from '../../dao/db/models/productModel.js';
import UserModel from '../../dao/db/models/userModel.js'; 

class CartController {
  constructor(cartRepositoryIndex) {
    this.cartRepositoryIndex = cartRepositoryIndex;
  }

  createCart = async (req, res) => {
    const { products, user } = req.body;
    const cartData = { productos: products, user };
    try {
      const newCart = await CartModel.create(cartData);
      res.status(201).json(newCart);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
    }
  }

  getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await CartModel.findById(cid)
        .populate({
          path: 'productos.producto',
          model: ProductModel,
        })
        .populate('user', 'first_name last_name email');

      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      res.json(cart);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
    }
  }

  addProductToCart = async (req, res) => {
    const { cid, _id } = req.params;
    const { quantity } = req.body;
    console.log("id",_id)

    try {
      const carrito = await CartModel.findById(cid).populate('productos.producto');
      const producto = await ProductModel.findById(_id);

      if (!carrito) {
        return res.status(404).json({ status: 'error', message: 'No se encontró el carrito' });
      }

      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'No se encontró el producto' });
      }

      const productoEnCarrito = carrito.productos.find(
        (item) => item.producto._id.toString() === producto._id.toString()
      );

      if (productoEnCarrito) {
        productoEnCarrito.quantity += quantity;
      } else {
        carrito.productos.push({ producto, quantity });
      }

      await carrito.save();

      res.status(200).json({ status: 'ok', message: 'Producto agregado al carrito' });
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
      res.status(500).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
    }
  };

  deleteProductFromCart = async (req, res) => {
    const { cid, _id } = req.params;
    console.log(`ID del Carrito: ${cid}, ID del Producto: ${_id}`);

    try {
      const carrito = await CartModel.findById(cid);
      if (!carrito) {
        return res.status(404).json({ status: 'error', message: 'No se encontró el carrito' });
      }

      carrito.productos = carrito.productos.filter((item) => item.producto.toString() !== _id);
  


      await carrito.save();

      res.status(200).json({ status: 'ok', message: 'Producto eliminado del carrito' });
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
    }
  }

  purchaseCart = async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await CartModel.findById(cid)
        .populate({
          path: 'productos.producto',
          model: ProductModel,
        })
        .populate('user', 'first_name last_name email');

      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      const itemsToPurchase = [];

      for (const cartItem of cart.productos) {
        const product = cartItem.producto;
        const requestedQuantity = cartItem.quantity;

        if (product.stock >= requestedQuantity) {
          itemsToPurchase.push({ product, quantity: requestedQuantity });
        }
      }

      if (itemsToPurchase.length === 0) {
        return res
          .status(400)
          .json({ message: 'Ningún producto tiene suficiente stock para la compra' });
      }

      for (const item of itemsToPurchase) {
        const product = item.product;
        const requestedQuantity = item.quantity;

        product.stock -= requestedQuantity;
        await product.save();
      }

      const order = new OrderModel({
        user: cart.user._id,
        items: itemsToPurchase,
        total: cart.total,
      });

      await order.save();

      cart.comprado = true;
      await cart.save();

      res.status(200).json({ message: 'Compra exitosa', order });
    } catch (error) {
      console.error('Error al finalizar la compra del carrito:', error);
      res.status(500).json({ error: 'Error al finalizar la compra del carrito' });
    }
  }
}

export default CartController;





































