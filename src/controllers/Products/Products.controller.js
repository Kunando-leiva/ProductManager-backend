import errorMessages from "../../middlewares/error/errorDictionary.js";
import { addErrorLogger } from "../../utils/logger.js"; 

class ProductController {
  constructor(productsRepositoryIndex) {
    this.productsRepositoryIndex = productsRepositoryIndex;
  }

  async createProduct(req, res) {
    try {
      
      const { title, description, price, category, stock, code, thumbnail } = req.body;

     
      if (!title || !description || !price || !category || !stock || !code || !thumbnail) {
        req.logger.error('Faltan datos en la solicitud'); 
        return res.status(400).json({ status: 'error', message: errorMessages.validationError });
      }

      
      const newProduct = {
        title,
        description,
        price,
        category,
        stock,
        code,
        thumbnail,
      };

      
      const createdProduct = await this.productsRepositoryIndex.createProduct(newProduct);

      
      res.status(201).json(createdProduct);
    } catch (error) {
      req.logger.error('Error al crear el producto:', error); 
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await this.productsRepositoryIndex.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        req.logger.error(`No se encontró el producto con ID: ${id}`); 
        res.status(404).json({ message: errorMessages.notFoundError });
      }
    } catch (error) {
      req.logger.error('Error al obtener el producto por ID:', error); 
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productsRepositoryIndex.getAllProducts();
      res.json(products);
    } catch (error) {
      req.logger.error('Error al obtener todos los productos:', error); 
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    try {
      const updatedProduct = await this.productsRepositoryIndex.updateProduct(id, updateData);
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        req.logger.error(`No se encontró el producto con ID: ${id}`); 
        res.status(404).json({ message: errorMessages.notFoundError });
      }
    } catch (error) {
      req.logger.error('Error al actualizar el producto:', error); 
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const deletedProduct = await this.productsRepositoryIndex.deleteProduct(id);
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        req.logger.error(`No se encontró el producto con ID: ${id}`); 
        res.status(404).json({ message: errorMessages.notFoundError });
      }
    } catch (error) {
      req.logger.error('Error al eliminar el producto:', error); 
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }

  
}

export default ProductController;

















































// import ProductService from "../../services/ProductService.js";


// let lastId = 0;

// class ProductsController  {

//   async getProducts(req, res)  {
//     try {
//       const productos = await ProductService.getProducts();
//       console.log("acadeberia",productos);
  
//       // Datos adicionales que deseas pasar a la vista
//       const data = {
//         name: "pony pisador",
//         description: "El mejor lugar para comprar tus productos de la Tierra Media",
//         role: "user",
//       };
  
//       res.render("home.handlebars", {
//         data,
//         style: "styles.css",
//         isAdmin: data.role === "user",
//         totalPages: productos.totalPages,
//         prevPage: productos.prevPage,
//         nextPage: productos.nextPage,
//         currentPage: productos.page,
//         hasPrevPage: productos.hasPrevPage,
//         hasNextPage: productos.hasNextPage,
//         prevLink: productos.prevLink,
//         nextLink: productos.nextLink,
//         productos: productos.docs, // productos es un objeto que contiene una propiedad "docs" con el array de productos
//       });
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
//     }
//   }



  
  
  
  
//   // Obtener un producto por ID
//  async getProductById(req, res) {
//     const id = req.params.id;
//     try {
//       const producto = await ProductService.getProductById(id);
//       if (!producto) {
//         return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
//       }
//       res.json({ status: 'ok', producto });
//     } catch (error) {
//       console.error(`Error al obtener el producto con ID ${id}:`, error);
//       res.status(500).json({ status: 'error', message: 'Error al obtener el producto' });
//     }
//   };
  
//   // Crear un nuevo producto
//   async createProducto(req, res)  {
//     try {
//       const { title, description, price, category, stock, code, thumbnail } = req.body;
//       if (!title || !description || !price || !category || !stock || !code || !thumbnail ) {
//         return res.status(400).json({ status: 'error', message: 'Faltan datos' });
//       }
    
//       lastId++;
//       const producto = {
//         ...req.body,
//         id: lastId,
//       };
//       const createProducto = ProductService.createProducto(producto);
//       res.status(201).json({ status: 'ok', producto: createProducto });
//     } catch (error) {
//       console.error('Error al crear el productoaa:', error);
//       res.status(500).json({ status: 'error', message: 'Error al crear el producto' });
//     }
//   };
  
//   // Actualizar un producto
//   async updateProduct(req, res) {
//     const id = req.params.id;
//     try {
//       const { title, description, price } = req.body;
//       if (!title || !description || !price) {
//         return res.status(400).json({ status: 'error', message: 'Faltan datos' });
//       }
//       const updatedProducto = ProductService.updateProduct(id, req.body);
//       if (!updatedProducto) {
//         return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
//       }
//       res.json({ status: 'ok', producto: updatedProducto });
//     } catch (error) {
//       console.error(`Error al actualizar el producto con ID ${id}:`, error);
//       res.status(500).json({ status: 'error', message: 'Error al actualizar el producto' });
//     }
//   };
  
  
//   // Eliminar un producto
//   async deleteProduct(req, res) {
//     const id = req.params.id;
//     try {
//       const deletedProduct = ProductService.deleteProduct(id);
//       if (!deletedProduct) {
//         return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
//       }
//       res.json({ status: 'ok', producto: deletedProduct });
//     } catch (error) {
//       console.error(`Error al eliminar el producto con ID ${id}:`, error);
//       res.status(500).json({ status: 'error', message: 'Error al eliminar el producto' });
//     }
//   };
  
  
  
//   //mostar todos los productos en json
//    get(req, res)  {
//     try {
//       const productos = ProductService.getProductos();
//       res.json({ status: 'ok', productos });
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
//     }
//   };

// }

// export default new ProductsController();
































































