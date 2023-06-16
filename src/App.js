import express from "express";
import  products  from "./router/products.router.js";
import Cart from "./router/Cart.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./router/viewRouter.js";
import { Server } from "socket.io";



const App = express();

const httpServer = App.listen(8080, () => {
  console.log("VISTO DEL SERVE 8080");
});


const socketServer = new Server(httpServer);

App.engine( "handlebars", handlebars.engine());
App.set("views",__dirname + "/views");
App.set("view engine", "handlebars");
App.use(express.static(__dirname + "/public"));


App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use('/static', express.static('public'))
App.use('/Api/products', products);
App.use('/Api/cart', Cart);
App.use('/', viewRouter);

socketServer.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  
  });


App.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));






App.get('/', function(req, res) {
  res.send(
    '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 98vh; background-color: black;">' +
    '<h1 style="color: green; text-align: center;"><a href="/Api/productshome" style="color: green; ">BIENVENIDOS AL PONY PISADOR (Productos)</a></h1>'+
    '<h1 style="color: green; text-align: center;"><a href="/Api/Carthome" style="color: green; ">CARRITO DEL PONY PISADOR</a></h1>' +
  '</div>'
  
  );
 
});

App.get('/Api/productshome', function(req, res) {
  res.send(
    '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 98vh; background-color: black;">' +
    '<h1 style="color: green; text-align: center;">BIENVENIDOS AL PONY PISADOR</h1>' +
    '<h2 style="color: green; text-align: center;"><a href="/Api/products" style="color: green; ">Ver los Productos</a></h2>' +
    '<h2 style="color: green; text-align: center;"><a href="/Api/products/2" style="color: green; ">Ruta /products/:id </a></h2>' +
    '<h2 style="color: green; text-align: center;"><a href="/Api/products?limit=5" style="color: green; ">Ruta /products?limit=5 </a></h2>' +
  '</div>'
  
  );
});



App.get('/Api/Carthome', function(req, res) {
  res.send(
    `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 98vh; background-color: black;">
      <h1 style="color: green; text-align: center;">BIENVENIDOS AL CARRITO DEL PONY PISADOR</h1>
      <h2 style="color: green; text-align: center;"><a href="/Api/cart" style="color: green;">Productos agregados al carrito</a></h2>
      <h2 style="color: green; text-align: center;"><a href="/Api/cart/:cartId/product/:productId" style="color: green;">/:cartId/product/:productId</a></h2>
      <h2 style="color: green; text-align: center;"><a href="/Api/cart/:cartId" style="color: green;">Ruta /products?limit=5</a></h2>
    </div>
  `
  
  );
});


App.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { layout: false });
});





