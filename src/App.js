import express from "express";
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import __dirname from "./utils.js";

import viewRouter from "./router/viewRouter.js";
import { Server } from "socket.io";
import ProductsRouter from './router/Productos.router.js';
import CartRouter from './router/carrito.router.js';
import messeges from './router/messages.router.js';
import MensajesModel from './dao/db/models/messages.js';



const App = express();
const connection = mongoose.connect(
'mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority');



const httpServer = App.listen(8080, () => {
  console.log("VISTO DEL SERVE 8080");
});
const io = new Server(httpServer);


App.use((req, res, next) => {
  req.io = io;
  next();
});


App.engine( "handlebars", handlebars.engine());
App.set("views", `${__dirname}/views`);
App.set("view engine", "handlebars");


App.use(express.json())
App.use(express.urlencoded({extended: true}))
App.use(express.static(`${__dirname}/public`));


App.use(express.static('public', {}));
App.use('/static', express.static('public'))
App.use("/css", express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
App.use('/', viewRouter);
App.use('/api', ProductsRouter);
App.use('/api/carrito', CartRouter);
App.use('/api/mensajes', messeges);




let messages = [];

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  io.emit('messageLogs', messages);


  socket.on('message', async (data) => {
    messages.push(data);

    // Guardar el mensaje en la base de datos utilizando Mongoose
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






export default App;



