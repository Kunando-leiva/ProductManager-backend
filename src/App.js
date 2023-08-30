import express from "express";
import Session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './middlewares/authentication/passport.config.js';
import morgan from "morgan";
// import viewRouter from "./router/viewRouter.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import  config  from "./config/config.js";
import {fork} from 'child_process';
import indexeRouter from './router/indexRouter.js';
import MensajesModel from './dao/db/models/messagesModel.js';
import passportCall from "./utils/passportcall.util.js";
import authorization from "./middlewares/auth.middleware.js";
import MongoSingleton from "./config/mongoSingleton.js";
import cors from "cors"


const App = express();
const PORT = config.PORT;
const MONGODB_URL = config.MONGODB_URL;
const KEY = config.KEY;

App.use(morgan("dev"));
App.engine("handlebars", handlebars.engine());
App.set("views", `${__dirname}/views`);
App.set("view engine", "handlebars");
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(express.static(`${__dirname}/public`));

const connection = mongoose.connect(`${MONGODB_URL}`);

const mongoIntance = MongoSingleton.getInstance();



App.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:8080/', // Cambia esto por el dominio de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
App.use(cors(corsOptions));


App.use(
  Session({
    store: new MongoStore({
      mongoUrl:
      `${MONGODB_URL}`,
      ttl: 3600,
    }),
    secret:`${KEY}`, 
    resave: false,
    saveUninitialized: false,
  })
  );
  
  initializePassport()
  App.use(passport.initialize())
  App.use(passport.session())

const httpServer = App.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  
});
const io = new Server(httpServer);




App.use('/', indexeRouter);
// App.use('/', viewRouter);

App.get("/test",(req,res)=>{
  res.send("Respuesta!")

})
App.get("/current",passportCall("jwt",{session:false}),authorization("user"),(req, res) => { res.send(req.user); });
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






App.get('/operacion', async (req, res) => {
  const child = fork('./src/operacionCompleja.js');
  child.send('start');
  child.on('message', (result) => {
  res.json(`Resultado: ${result}`);
});

// process.on("message", () => {
//   console.log("PID", process.pid);

//   let result = 0; 

//   for (let i = 0; i < 5e9; i++){
//   result += i;
  
// }

// process.send(result);
// });
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























 
//  const response = await ProductosManager.explain();
//  console.log(response);

//  const productoec = await carritoModel.find({_id:"64af41d64a0ea66ae597689d"}).populate("productos.producto");
//   console.log(JSON.stringify(productoec, null, 2));









export default App;
export { httpServer };