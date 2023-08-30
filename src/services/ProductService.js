import mongoose from 'mongoose';


class ProductService {
  constructor(productDao) {
    this.productDao = productDao;
  }

  async createProduct(productData) {
    return this.productDao.createProduct(productData);
  }

  async getProductById(id) {
    return this.productDao.getProductById(id);
  }

  async getAllProducts() {
    return this.productDao.getAllProducts();
  }

  async updateProduct(id, updateData) {
    return this.productDao.updateProduct(id, updateData);
  }

  async deleteProduct(id) {
    return this.productDao.deleteProduct(id);
  }

  // Agrega más métodos según tus necesidades
}

export default ProductService;






































// class ProductService {
//   static async getProducts() {
//     try {
//       const productos = await productoModel.find();
//       return productos;
//     } catch (error) {
//       throw new Error("Error al obtener los productos: " + error.message);
//     }
//   }

//   static async getProductById(id) {
//     try {
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             throw new Error('El id no es válido');
//         }
//         const ObjectIdProductoId = new mongoose.Types.ObjectId(id);


//       const producto = await productoModel.findById(ObjectIdProductoId);
//       return producto;
//     } catch (error) {
//       throw new Error("Error al obtener el producto: " + error.message);
//     }
//   }

//   async createProducto(producto) {
//     try {
      
//       const createProducto = await productoModel.create(producto);
//       return createProducto;
//     } catch (error) {
//       console.error('Error al crear el productoss:', error);
//       throw error;
//     }
//   }

//   static async updateProduct(id, updatedProduct) {
//     try {
//       const updatedProducto = await productoModel.findByIdAndUpdate(
//         id,
//         updatedProduct,
//         { new: true }
//       );
//       return updatedProducto;
//     } catch (error) {
//       throw new Error("Error al actualizar el producto: " + error.message);
//     }
//   }

//   static async deleteProduct(id) {
//     try {
//       const deletedProduct = await productoModel.findByIdAndDelete(id);
//       return deletedProduct;
//     } catch (error) {
//       throw new Error("Error al eliminar el producto: " + error.message);
//     }
//   }
// }

// export default ProductService;
