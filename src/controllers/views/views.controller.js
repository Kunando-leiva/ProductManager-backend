import mongoose from "mongoose";
import { cartRepositoryIndex } from "../../repositories/index.repositorie.js"
class ViewController {
  constructor(ProductController, chatDao, UserDao, CartRepository ) {
    this.ProductController = ProductController;
    this.UserDao = UserDao;
    this.chatDao = chatDao;
    this.CartDao = cartRepositoryIndex;
    
    
    

  }

// funcion para renderizar el home
  async getHome(req, res) {
    const products = await this.ProductController.getAllProducts();
    
    res.render("home.handlebars", {
        products,
        style:"styles.css",
     });
  }

 

// funcion para renderizar el login
  async getLogin(req, res) {
    res.render("login.handlebars", { 
        user: req.user,
        style:"styles.css"
        
     });
  }

  // funcion para renderizar el register
  async getRegister(req, res) {
    res.render("register.handlebars", { 
        user: req.user,
        style:"styles.css",
     });
  }

  // funcion para renderizar el menu
  
  async getMenu(req, res) {
    try {
      if (req.isAuthenticated()) {
        const user = req.user; // Obtén el usuario autenticado desde req.user
    
        // Crear un objeto con las propiedades necesarias del usuario
        const userData = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
          
        };
    
        res.render("menu.handlebars", {
          user: userData,
          style: "styles.css",
        });
      } else {
        res.status(401).send("No autenticado");
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res.status(500).send("Error al obtener el usuario");
    }
  }
  
  
  
  
  
  
  
  
 

    // funcion para renderizar el realTimeProducts
    async getRealTimeProducts(req, res) {
      const products = await this.ProductController.getAllProducts();
      
      res.render("realTimeProducts", { 
        products,
        style:"styles.css",

       });
    }

   
    async getMensajes(req, res) {  
        const mensajes = await this.chatDao.getMensajes();
        res.render("chat.handlebars", { 
          mensajes,
          style:"styles.css"
         });
    }

    

    
    async getCartById(req, res) {
      const { cid } = req.params;
    
      if (!mongoose.Types.ObjectId.isValid(cid)) {
        return res.status(400).json({ message: 'ID de carrito no válido' });
      }
    
      try {
        const cart = await this.cartRepositoryIndex.getCartById(cid);
    
        if (cart) {
          // Renderiza la vista "carrito.handlebars" con los datos del carrito
          res.render('carrito', cart); // Envía el objeto `cart` como contexto para la vista
        } else {
          res.status(404).json({ message: 'Carrito no encontrado' });
        }
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
      }
    }
    
  
    
    
    
    
    
    
    
    
    
    
    

}
  


export default ViewController
