import CartDao from "../../dao/db/carrito.dao.js"

class CartController {
  constructor(
    CartDao, 
    productsRepositoryIndex) {
    this.cartDao = CartDao;
    this.productsRepositoryIndex = productsRepositoryIndex;
    
  }

  async createCart(req, res) {
    const { products, user } = req.body;
    const cartData = { products, user };
    try {
      const newCart = await this.cartDao.createCart(cartData);
      res.status(201).json(newCart);
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      res.status(500).json({ status: "error", message: "Error al crear el carrito" });
    }
  }

  async getCartById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await this.cartDao.getCartById(cid);
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ message: "Carrito no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      res.status(500).json({ status: "error", message: "Error al obtener el carrito" });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    console.log("cid:", cid);
    console.log("pid:", pid);
    console.log("quantity:", quantity);



    try {
      const carrito = await this.cartDao.getCartById(cid);
      const producto = await this.productsRepositoryIndex.getProductById(pid);


      if (!carrito) {
        return res.status(404).json({ status: "error", message: "No se encontró el carrito" });
      }

      if (!producto) {
        return res.status(404).json({ status: "error", message: "No se encontró el producto" });
      }

      
      let productoEnCarrito = carrito.productos.find(item => item.producto._id.toString() === producto._id.toString());

      if (productoEnCarrito) {
        productoEnCarrito.quantity += quantity;
      } else {
        productoEnCarrito = { producto: producto, quantity: quantity };
        carrito.productos.push(productoEnCarrito);
      }
      
      await this.cartDao.addProductToCart(cid, pid, quantity);

      const productosConDetalles = await Promise.all(carrito.productos.map(async item => {
        const productoDetalle = await this.productsRepositoryIndex.getProductById(item.producto._id);
        return {
          producto: productoDetalle,
          quantity: item.quantity
        };
      }));
  
      
      res.status(200).json({ status: "ok", productos: productosConDetalles });
      
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito" });
    }
  }
  
  

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      await this.cartDao.deleteProductFromCart(cid, pid);
      res.status(200).json("Producto eliminado del carrito");
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
      res.status(500).json({ status: "error", message: "Error al eliminar el producto del carrito" });
    }
  }
  
  async purchaseCart(req, res) {
    const { cid } = req.params; // Obtiene el ID del carrito desde los parámetros de la URL
    
    try {
      // Busca el carrito por su ID y popula los productos
      const cart = await this.cartDao.getCartById(cid);
  
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      const itemsToPurchase = []; // Almacenará los productos que se pueden comprar
  
      // Verifica el stock de cada producto en el carrito y agrega los que se pueden comprar
      for (const cartItem of cart.productos) {
        const product = cartItem.producto;
        const requestedQuantity = cartItem.quantity;
  
        // Asume que el producto tiene un campo 'stock' que indica su stock actual
        if (product.stock >= requestedQuantity) {
          // Hay suficiente stock para comprar este producto
          itemsToPurchase.push({ product, quantity: requestedQuantity });
        }
      }
  
      if (itemsToPurchase.length === 0) {
        // Ningún producto tiene suficiente stock para la compra
        return res.status(400).json({ message: 'Ningún producto tiene suficiente stock para la compra' });
      }
  
      // Resta la cantidad comprada del stock de cada producto en itemsToPurchase
      for (const item of itemsToPurchase) {
        const product = item.product;
        const requestedQuantity = item.quantity;
  
        // Resta la cantidad comprada del stock del producto
        product.stock -= requestedQuantity;
        await product.save();
      }
  
      // Crea una orden de compra para registrar la compra
      const order = new Order({
        user: req.user._id, // Asigna el ID del usuario que realiza la compra (si tienes autenticación de usuario)
        items: itemsToPurchase, // Copia los productos que se pueden comprar a la orden
        total: cart.total, // Copia el total del carrito a la orden
      });
  
      await order.save();
  
      // Marca el carrito como comprado o elimínalo, según tus necesidades
      // Por ejemplo, si prefieres marcarlo como comprado:
      cart.comprado = true; // Supongo que tu modelo de carrito tiene un campo "comprado"
      await cart.save();
  
      res.status(200).json({ message: 'Compra exitosa', order });
    } catch (error) {
      console.error('Error al finalizar la compra del carrito:', error);
      res.status(500).json({ error: 'Error al finalizar la compra del carrito' });
    }
  }
}

export default CartController;

















































// import express from 'express';
// import CarritoManager from '../../dao/db/manager/carrito.dao.js';
// import ProductosModel from '../../dao/db/models/productModel.js';
// import carritoModel from '../../dao/db/models/cartsModel.js';

// const router = express.Router();
// const carritoManager = new CarritoManager();

// // Crear un nuevo carrito
// router.post('/', async (req, res) => {
//   try {
//     const carrito = await carritoManager.createCarrito();
//     res.status(201).json({ status: 'ok', carrito });
//   } catch (error) {
//     console.error('Error al crear el carrito:', error);
//     res.status(500).json({ status: 'error', message: 'Error al crear el carrito' });
//   }
// });

// // Obtener un carrito por su ID
// router.get('/:cid', async (req, res) => {
//   const { cid } = req.params;
//   try {
//     const carrito = await carritoManager.getCarritoById(cid);
//     res.status(200).json({ status: 'ok', carrito });
//   } catch (error) {
//     console.error('Error al obtener el carrito:', error);
//     res.status(500).json({ status: 'error', message: 'Error al obtener el carrito' });
//   }
// });

// // Agregar un producto al carrito
// router.post("/:cid/producto", async (req, res) => {
//   const { cid } = req.params; // Obtener el ID del carrito desde el parámetro de ruta
//   const { productoId } = req.body; // Obtener el ID del producto de la solicitud

//   try {
//     const carrito = await carritoModel.findOne({ _id: cid }).populate("productos.producto");
//     const producto = await ProductosModel.findOne({ _id: productoId });
//     console.log(JSON.stringify(carrito, null, 2));

//     if (!carrito) {
//       console.log("No se encontró el carrito.");
//       return res.status(404).json({ status: "error", message: "No se encontró el carrito" });
//     }

//     if (!producto) {
//       console.log("No se encontró el producto.");
//       return res.status(404).json({ status: "error", message: "No se encontró el producto" });
//     }

//     const productoEnCarrito = carrito.productos.find(item => item.producto && item.producto.equals(producto._id));
//     if (productoEnCarrito) {
//       // Si el producto ya está en el carrito, incrementar la cantidad (quantity) en 1
//       productoEnCarrito.quantity++;
//     } else {
//       // Si el producto no está en el carrito, agregarlo con quantity inicial de 1
//       carrito.productos.push({ producto: producto, quantity: 1 });
//     }

//     await carrito.save();
//     console.log("Producto agregado al carrito exitosamente.");

//     const carritoJson = JSON.stringify(carrito, null, 2);
//     console.log(carritoJson);

//     res.status(200).json({ status: "ok", carrito });
//   } catch (error) {
//     console.error("Error al agregar el producto al carrito:", error);
//     res.status(500).json({ status: "error", message: "Error al agregar el producto al carrito" });
//   }
// });


// // Obtener todos los carritos
// router.get('/', async (req, res) => {
//   try {
//     const carritos = await carritoManager.getCarritos();
//     res.status(200).json({ status: 'ok', carritos });
    
//   } catch (error) {
//     console.error('Error al obtener los carritos:', error);
//     res.status(500).json({ status: 'error', message: 'Error al obtener los carritos' });
//   }
// });

// // Eliminar un producto del carrito
// router.delete('/:cid/producto/:pid', async (req, res) => {
//   const { cid, pid } = req.params;

//   try {
//     const carrito = await carritoManager.deleteProductFromCarrito(cid, pid);
//     res.status(200).json({ status: 'ok', carrito });
//   } catch (error) {
//     console.error('Error al eliminar el producto del carrito:', error);
//     res.status(500).json({ status: 'error', message: 'Error al eliminar el producto del carrito' });
//   }
// });

// export default router;
