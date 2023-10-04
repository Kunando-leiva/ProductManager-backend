import errorMessages from "../../middlewares/error/errorDictionary.js";
import { addErrorLogger } from "../../utils/logger.js"; 

class ProductController {
  constructor(productsRepositoryIndex) {

    this.productsRepositoryIndex = productsRepositoryIndex;

  }

  async createProduct(req, res) {
    try {
      const { title, description, price, category, stock, code, thumbnail } = req.body;
  
   
      if (!title || !description || isNaN(price) || isNaN(stock) || !code || !thumbnail) {
        req.logger.error('Faltan datos en la solicitud o los datos son inválidos'); 
        return res.status(400).json({ status: 'error', message: 'Datos de producto incorrectos' });
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
  
      const responsePayload = {
        payload: createdProduct,
      };
      res.status(201).json(responsePayload);
    } catch (error) {
      if (error.name === 'ValidationError') {
        
        req.logger.error('Error de validación al crear el producto:', error.message); 
        res.status(400).json({ status: 'error', message: error.message });
      } else {

        req.logger.error('Error al crear el producto:', error); 
        res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
      }
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
    console.log("requser", req.user);
    const userId = req.user.id;
  
    try {
      const product = await this.productsRepositoryIndex.getProductById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
  
      if (req.user.role === "admin" || (req.user.role === "premium" && product.owner === userId)) {
        const updatedProduct = await this.productsRepositoryIndex.updateProduct(id, updateData);
        res.json({ message: "Producto actualizado correctamente", updatedProduct }); // Devuelve el mensaje y el producto actualizado
      } else {
        req.logger.error(`No tienes permiso para actualizar este producto.`);
        res.status(403).json({ message: "No tienes permiso para actualizar este producto" });
      }
    } catch (error) {
      req.logger.error('Error al actualizar el producto:', error);
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
    }
  }
  

async deleteProduct(req, res) {
  const { id } = req.params;
  console.log("delete", req.user)
  const userId = req.user.id; 


  try {
      const product = await this.productsRepositoryIndex.getProductById(id);

      if (!product) {
          return res.status(404).json({ message: "Producto no encontrado" });
      }

    
      if (req.user.role === "admin" || (req.user.role === "premium" && product.owner === userId)) {
          const deletedProduct = await this.productsRepositoryIndex.deleteProduct(id);
          res.json(deletedProduct);
      } else {
          req.logger.error(`No tienes permiso para eliminar este producto.`);
          res.status(403).json({ message: "No tienes permiso para eliminar este producto" });
      }
  } catch (error) {
      req.logger.error('Error al eliminar el producto:', error);
      res.status(500).json({ status: 'error', message: errorMessages.internalServerError });
  }
}

  
}

export default ProductController;

















































