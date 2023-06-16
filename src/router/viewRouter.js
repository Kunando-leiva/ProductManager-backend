import express from 'express';
const router = express.Router();
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager('products.json');

router.get('/', function(req, res) {
  let data = {
    name: "Pony Pisador", 
    description: "El Pony Pisador es un lugar de encuentro para los amantes de la cerveza, la comida y la buena música. Un lugar donde la magia de la Tierra Media se hace presente en cada rincón. Un lugar donde los amigos se reúnen para compartir un buen momento. Un lugar donde los viajeros descansan y se preparan para continuar su camino. Un lugar donde los sueños se hacen realidad.",
    role: "admin",
  };

  const products = productManager.getProducts();

  res.render("home", {
    data,
    style: "styles.css",
    isAdmin: data.role === 'admin',
    products,
  });
});



router.get('/realtimeproducts', function(req, res) {
  let data = {
    name: "Ponys Pisador", 
    description: "El Pony Pisador es un lugar de encuentro para los amantes de la cerveza, la comida y la buena música. Un lugar donde la magia de la Tierra Media se hace presente en cada rincón. Un lugar donde los amigos se reúnen para compartir un buen momento. Un lugar donde los viajeros descansan y se preparan para continuar su camino. Un lugar donde los sueños se hacen realidad.",
    role: "admin",
  };

  const products = productManager.getProducts();
  
  res.render("realTimeProducts", {
    data,
    style: "styles.css",
    isAdmin: data.role === 'admin',
    products,
  });
});

export default router;