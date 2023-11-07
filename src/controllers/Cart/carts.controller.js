import mongoose from 'mongoose';
import CartModel from '../../dao/db/models/cartsModel.js';
import productoModel from '../../dao/db/models/productModel.js';
import OrderModel from "../../dao/db/ticket.dao.js"
import { productsRepositoryIndex, cartRepositoryIndex } from "../../repositories/index.repositorie.js"

class CartController {
    constructor(cartRepositoryIndex) {
      this.cartRepositoryIndex = cartRepositoryIndex;
      this.productsRepositoryIndex = productsRepositoryIndex;
     
    }

   async createCart (req, res) {

    const { products, user } = req.body;
    const cartData = { productos: products, user };
    try {
      const newCart = await this.cartRepositoryIndex.createCart(cartData);
      
      const response = {
        ...newCart._doc, 
        userId: user,     
      };
      res.status(201).json(response);
    } catch (error) {
      console.error('Error al crear el carrito:', error);
      res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
    }
}


 

async getCartById(req, res) {
  const { cid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({ message: 'ID de carrito no válido' });
  }

  try {
    const cart = await this.cartRepositoryIndex.getCartById(cid);

    if (cart) {
      res.status(200).json(cart); // Devuelve el carrito como JSON
    } else {
      res.status(404).json({ message: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}



async addProductToCart(req, res) {
  const { cid, id } = req.params;
  const { quantity } = req.body;

  try {
    const product = await this.productsRepositoryIndex.getProductById(id);

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'No se encontró el producto' });
    }

   
    if (product.stock < quantity) {
      return res.status(400).json({ status: 'error', message: 'No hay suficiente stock disponible' });
    }

    
    product.stock -= quantity;

    
    await this.productsRepositoryIndex.updateProduct(id, { stock: product.stock });

    const cart = await this.cartRepositoryIndex.addProductToCart(cid, id, quantity);

    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'No se encontró el carrito' });
    }

    return res.status(200).json({ status: 'ok', message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar el producto al carrito:', error);
    return res.status(500).json({ status: 'error', message: 'Error al agregar el producto al carrito' });
  }
}







deleteProductFromCart = async (req, res) => {
  const { cid, id } = req.params;

  try {
    const carrito = await this.cartRepositoryIndex.getCartById(cid);

    if (!carrito) {
      return res.status(404).json({ status: 'error', message: 'No se encontró el carrito' });
    }

    
    carrito.productos = carrito.productos.filter((item) => item.producto.toString() !== id);

    
    console.log("productoaa", id)
    const product = await this.productsRepositoryIndex.getProductById(id)

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'No se encontró el producto' });
    }

    
    if (product instanceof productoModel) { 
      if (product.stock >= 1) {
        product.stock -= 1; 
        await product.save(); 
      }
    } else {
      
      console.error('El objeto "product" no es un documento de Mongoose válido para el modelo de productos.', product);
    }
    


    res.status(200).json({ status: 'ok', message: 'Producto eliminado del carrito', id, cid });
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





































