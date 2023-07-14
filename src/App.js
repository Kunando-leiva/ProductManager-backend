import express from "express";
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import __dirname from "./utils.js";
import { Server } from "socket.io";
import  FileStore  from "session-file-store";

import viewRouter from "./router/viewRouter.js";
import ProductosRouter from './router/Productos.router.js';
import CartRouter from './router/carritos.router.js';
import messeges from './router/messages.router.js';

import productoManager from './dao/db/manager/producto.js';
import MensajesModel from './dao/db/models/messages.js';
import ProductosModel from './dao/db/models/product.js';


import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";




const FileStorage = FileStore(session);
const App = express();
const connection = mongoose.connect('mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority');

const httpServer = App.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
const io = new Server(httpServer);


const ProductosManager = new productoManager();

App.use((req, res, next) => {
  req.io = io;
  next();
});

App.engine("handlebars", handlebars.engine());
App.set("views", `${__dirname}/views`);
App.set("view engine", "handlebars");

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static(`${__dirname}/public`));
App.use(express.static('public', {}));
App.use('/static', express.static('public'));
App.use("/css", express.static(`${__dirname}/node_modules/bootstrap/dist/css`));

App.use('/', viewRouter);
App.use('/api', ProductosRouter);
App.use('/api/carrito', CartRouter);
App.use('/api/mensajes', messeges);


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


App.get('/filtro-productos', async (req, res) => {
  try {
    const filtro = await ProductosModel.aggregate([
      {
        $match: { category: 'comida',  }
      },
      {
        $group: { _id: '$title', totalstock: { $sum: '$stock' } }
      },
      {
        $sort: { totalstock: -1 }
      },
      {
        $group: { _id:1, filtro: { $push: '$$ROOT' } }
      },
      {
        $project: { 
          "_id": 0, 
          filtro: "$filtro" }
      },
      {
        $merge: { 
          into:"reports"
         }
      }


    ]);

    console.log('filtro', filtro);

    res.json(filtro);
  } catch (error) {
    console.error('Error al ejecutar la operación de agregación:', error);
    res.status(500).json({ error: 'Error al ejecutar la operación de agregación' });
  }
});




App.get('/stats', async (req, res) => {
  try {
    let response = await ProductosModel.find({}).explain('executionStats');
    console.log(response);

    // Enviar la respuesta al cliente como JSON
    res.json(response);
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
    res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
});



App.use(cookieParser());
App.use(
  session({
 store:MongoStore.create({
    mongoUrl:
     "mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority",
     ttl: 600,  
 }),
  secret: 'secret', 
  resave: false,
  saveUninitialized: true,

}));



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




App.use(session({
  secret: "codersecret",

  resave: true,

  saveUninitialized: true,

  cookie: { maxAge: 10000},

}));


App.get("/setSession", (req, res) => {
  if (req.session.count) {
    req.session.count++;
    res.send(`Usted ha visitado la pagina ${req.session.count} veces`);
  }
  else {
    req.session.count = 1;
    res.send("Bienvenido a la pagina por primera vez");
  }
});

App.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout ok");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

 


App.get('/login', (req, res) => {
  const { username, password } = req.query
  if (username !== 'pepe' || password !== 'pepepass') {
    return res.send('login failed')
  }
  req.session.user = username
  req.session.admin = true
  res.send('login success!')
})

 function auth(req, res, next) {
  if (req.session?.user === 'pepe' && req.session?.admin) {
    return next()
  }
  return res.status(401).send('error de autorización!')
 }

App.get('/privado', auth, (req, res) => {
  res.send('si estas viendo esto es porque ya te logueaste!')
 })
 

 

export default App;
export { httpServer };