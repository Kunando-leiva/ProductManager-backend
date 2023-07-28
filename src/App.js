
import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewRouter from "./router/viewRouter.js";
import sessionsRouter from "./router/session.router.js";
import __dirname from "./utils.js";

import { Server } from "socket.io";
import cookieParser from "cookie-parser";

import ProductosRouter from './router/Productos.router.js';
import CartRouter from './router/carritos.router.js';
import messeges from './router/messages.router.js';


import MensajesModel from './dao/db/models/messages.js';
import ProductosModel from './dao/db/models/product.js';
import carritoModel from "./dao/db/models/carts.js";
import productoManager from './dao/db/manager/producto.js';
import CarritoManager from "./dao/db/manager/carrito.js";
import productoModel from "./dao/db/models/product.js";


const App = express();

App.engine("handlebars", handlebars.engine());
App.set("views", `${__dirname}/views`);
App.set("view engine", "handlebars");

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static(`${__dirname}/public`));


const connection = mongoose.connect('mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority');


App.use(
  session({
    store: new MongoStore({
      mongoUrl:
      "mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority",
      ttl: 3600,
    }),
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
  })
  );
    


 initializePassport()
App.use(passport.initialize())
App.use(passport.session())




 const httpServer = App.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
 const io = new Server(httpServer);
 
App.use('/', viewRouter);
App.use('/api/productos', ProductosRouter);
App.use('/api/carrito', CartRouter);
App.use('/api/mensajes', messeges);
App.use('/api/sessions', sessionsRouter);

App.use((req, res, next) => {
  req.io = io;
  next();
});




let messages = [];

io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado');

  

  
  io.emit('messageLogs', messages);

  socket.on('message', async (data) => {
    messages.push(data);
    try {
      const newMessage = new MensajesModel(data);
      await newMessage.save();
      console.log('Mensaje guardado en la base de datos');
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error);
    }

    io.emit('messageLogs', messages);
    socket.broadcast.emit('messageConected', 'Se ha conectado un usuario nuevo');
    console.log('Un cliente envió un mensaje');

    
   



  });
  

});

  
  
  

  
//   App.get('/stats', async (req, res) => {
//     try {
//     let response = await ProductosModel.find({}).explain('executionStats');
//     // console.log(response);
    
//     // Enviar la respuesta al cliente como JSON
//     res.json(response);
//   } catch (error) {
//     console.error('Error al obtener las estadísticas:', error);
//     res.status(500).json({ error: 'Error al obtener las estadísticas' });
//   }
// });



App.use(cookieParser());



App.get("/setCookie", (req, res) => {
  res.cookie("coder", "coderhouse", { maxAge: 60000 });
  res.send("Cookie seteada");
});

App.use("/getCookie", (req, res) => {  

  res.send(req.cookies);
});

App.use("/removeCookie", (req, res) => {
  res.clearCookie("coder");
  res.send("Cookie eliminada");
});




// App.use(session({
//   secret: "codersecret",
  
//   resave: true,
  
//   saveUninitialized: true,

//   cookie: { maxAge: 10000},
  
// }));


// App.get("/setSession", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//     res.send(`Usted ha visitado la pagina ${req.session.count} veces`);
//   }
//   else {
//     req.session.count = 1;
//     res.send("Bienvenido a la pagina por primera vez");
//   }
// });

// App.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (!err) res.send("Logout ok");
//     else res.send({ status: "Logout ERROR", body: err });
//   });
// });






 
//  const response = await ProductosManager.explain();
//  console.log(response);

//  const productoec = await carritoModel.find({_id:"64af41d64a0ea66ae597689d"}).populate("productos.producto");
//   console.log(JSON.stringify(productoec, null, 2));









export default App;
export { httpServer };