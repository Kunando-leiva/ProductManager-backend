class ViewController {
  constructor(productService, cartService, userService) {
    this.productService = productService;
    this.cartService = cartService;
    this.userService = userService;
    
  }
// funcion para renderizar el home
  async getHome(req, res) {
    const products = await this.productService.getAllProducts();
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

  // funcion para renderizar el carrito
 

    // funcion para renderizar el realTimeProducts
    async getRealTimeProducts(req, res) {
      const products = await this.productService.getAllProducts();
      
      res.render("realTimeProducts", { products });
    }

    // funcion para renderizar el chat
    async getChat(req, res) {
    const products = await this.productService.getAllProducts();
    res.render("chat", { products });
    }

    
// funcion para renderizar el carrito
  async getCart(req, res) {
    const products = await this.cartService.getCart(req.user.id);
    res.render("cart", { products });
  }
    

  // Agrega más métodos según tus necesidades
}

export default ViewController;
