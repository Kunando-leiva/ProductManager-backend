class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async createProduct(req, res) {
    try {
       const { title, description, price, category, stock, code, thumbnail } = req.body;
       if (!title || !description || !price || !category || !stock || !code || !thumbnail ) {
        return res.status(400).json({ status: 'error', message: 'Faltan datos' });
      }

     

    const productData = req.body;
    const newProduct = await this.productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ status: 'error', message: 'Error al crear el producto' });
  }
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await this.productService.getProductById(id);
    console.log("acadeberia",product);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }

  async getAllProducts(req, res) {
    const products = await this.productService.getAllProducts();
    res.json(products);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProduct = await this.productService.updateProduct(id, updateData);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const deletedProduct = await this.productService.deleteProduct(id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }

  // Agrega más métodos según tus necesidades
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
































































