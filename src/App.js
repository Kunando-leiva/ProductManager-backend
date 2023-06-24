import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./router/viewRouter.js";
import  products  from "./router/products.router.js";
import Cart from "./router/Cart.router.js";
import { Server } from "socket.io";
import ProductManager from './ProductManager.js';

const App = express();

const httpServer = App.listen(8080, () => {
  console.log("VISTO DEL SERVE 8080");
});

const io = new Server(httpServer);

App.use((req, res, next) => {
  req.io = io;
  next();
});

App.engine( "handlebars", handlebars.engine());
App.set("views",__dirname + "/views");
App.set("view engine", "handlebars");


App.use(express.json())
App.use(express.urlencoded({extended: true}))

App.use('/static', express.static('public'))
App.use('/Api/products', products);
App.use('/Api/cart', Cart);
App.use('/', viewRouter);




io.on('connection', (socket) => {
  console.log('Un cliente se ha conectadooooo');
 
  socket.on('message', (data) => {
    console.log(data);
  });
  

  socket.on('deleteProduct', (productId) => {
    try {
      ProductManager.deleteProduct(productId);
      res.sendStatus(200);
     
      try {
        io.emit('productDeleted', productId);
      } catch (error) {
        console.error('Error al emitir evento de producto eliminado:', error);
      
    }
      io.emit('productDeleted', productId);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  });


});


App.use(express.static('public', {
 
}));



export default App;



