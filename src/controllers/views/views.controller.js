class ViewController {
  constructor(productDao, cartDao, userDao, chatDao) {
    this.productDao = productDao;
    this.userDao = userDao;
    this.cartDao = cartDao;
    this.chatDao = chatDao
    

  }

// funcion para renderizar el home
  async getHome(req, res) {
    const products = await this.productDao.getAllProducts();
    res.render("home.handlebars", { 
        products
     });
  }

 

// funcion para renderizar el login
  async getLogin(req, res) {
    res.render("login.handlebars", { 
        user: req.user,
        
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
    res.render("menu", {
         user: req.user,
         style:"styles.css", });
    }

  
 

    // funcion para renderizar el realTimeProducts
    async getRealTimeProducts(req, res) {
      const products = await this.productDao.getAllProducts();
      
      res.render("realTimeProducts", { products });
    }

   
    async getMensajes(req, res) {  
        const mensajes = await this.chatDao.getMensajes();
        res.render("chat.handlebars", { 
          mensajes,
          style:"styles.css"
         });
    }

    
// funcion para renderizar el carrito
  async getCart(req, res) {
    const products = await this.cartDao.getCart(req.user.id);
    res.render("cart", { products });
  }
    

}
  


export default ViewController
