import { Router } from "express";  
import { Server } from "socket.io";
import ProductManager from '../ProductManager.js';

const io = new Server();
const router = Router();
const productManager = new ProductManager('products.json');




router.get('/', (req, res) => {

 res.render("menu", {
    style: "styles.css",
  });
   
});


router.get('/realTimeProducts.handlebars', function(req, res) {
  const datarealtimer = {
    name: "Pony Pisador",
    description: "El Pony Pisador es un lugar de encuentro para los amantes de la cerveza, la comida y la buena música. Un lugar donde la magia de la Tierra Media se hace presente en cada rincón. Un lugar donde los amigos se reúnen para compartir un buen momento. Un lugar donde los viajeros descansan y se preparan para continuar su camino. Un lugar donde los sueños se hacen realidad.",
    role: "admin",
  };
  const products = productManager.getProducts();

  res.render("realTimeProducts", {
    datarealtimer,
    style: "styles.css",
    isAdmin: datarealtimer.role === 'admin',
    products,
  });
});




router.get(['/home.handlebars', '/realTimeProducts.handlebars'], function(req, res) {
  const data = {
    name: "Pony Pisador",
    description: "El Pony Pisador es un lugar de encuentro para los amantes de la cerveza, la comida y la buena música. Un lugar donde la magia de la Tierra Media se hace presente en cada rincón. Un lugar donde los amigos se reúnen para compartir un buen momento. Un lugar donde los viajeros descansan y se preparan para continuar su camino. Un lugar donde los sueños se hacen realidad.",
    role: "admin",
  };
  const products = productManager.getProducts();

  res.render(req.path.substring(1), {
    data,
    style: "styles.css",
    isAdmin: data.role === 'admin',
    products,
  });
});



  
  router.post('/', (req, res) => {
    const { id, title, description, code, price, stock, category, thumbnails, status } = req.body;
  
    try {
      const productId = productManager.addProduct(
        id,
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
      );
      const product = productManager.getProductById(productId); 
      res.json({ id: productId });
      io.emit('productCreated', product); 
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
    console.log(req.body);
  });
  


  router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
  
    try {
      productManager.deleteProduct(productId);
      res.sendStatus(200);
   
      try {
        io.emit('productDeleted', productId);
      } catch (error) {
        console.error('Error le chingastes:', error);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

export default router;