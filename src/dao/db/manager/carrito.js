import carritoModel from "../models/carts.js";

export default class CarritoManager {
  async createCarrito() {
    try {
      const carrito = await carritoModel.create({});
      return carrito;
    } catch (error) {
      throw new Error('Error al crear el carrito: ' + error.message);
    }
  }

  async getCarritoById(id) {
    try {
      const carrito = await carritoModel.findById(id);
      return carrito;
    } catch (error) {
      throw new Error('Error al obtener el carrito: ' + error.message);
    }
  }

  async addProductToCarrito(carritoId, product) {
    try {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = await carritoModel.findOne({
        _id: carritoId,
        'products.id': product.id
      });

      if (existingProduct) {
        // El producto ya existe, incrementar la cantidad
        await carritoModel.findOneAndUpdate(
          {
            _id: carritoId,
            'products.id': product.id
          },
          {
            $inc: { 'products.$.quantity': 1 }
          }
        );
      } else {
        // El producto no existe, agregarlo al carrito
        product.quantity = 1;
        await carritoModel.findByIdAndUpdate(
          carritoId,
          { $push: { products: product } },
          { new: true }
        );
      }

      // Obtener el carrito actualizado
      const updatedCarrito = await carritoModel.findById(carritoId);
      return updatedCarrito;
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito: ' + error.message);
    }
  }

  async removeProductFromCarrito(carritoId, productId) {
    try {
      const updatedCarrito = await carritoModel.findByIdAndUpdate(
        carritoId,
        { $pull: { products: { id: productId } } },
        { new: true }
      );
      return updatedCarrito;
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito: ' + error.message);
    }
  }

  async getCarritos() {
    try {
      const carritos = await carritoModel.find().lean();
      return carritos;
    } catch (error) {
      throw new Error('Error al obtener los carritos: ' + error.message);
    }
  }
}
