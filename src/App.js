import express from "express";
import handlebars from "express-handlebars";
import passport from 'passport';
import initializePassport from './middlewares/authentication/passport.config.js';
import morgan from "morgan";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import {fork} from 'child_process';
import indexeRouter from './router/indexRouter.js';
import passportCall from "./utils/passportcall.util.js";
import authorization from "./middlewares/auth.middleware.js";
import MongoSingleton from "./config/mongoSingleton.js";
import cors from "cors"
import sessiondConfig from "../db/sessiondbConfig.js";
import session from "express-session";
import router from "./router/indexRouter.js"



import mongoConnect from "../db/index.js";


const app = express();


mongoConnect()


app.use(morgan("dev"));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));


const mongoIntance = MongoSingleton.getInstance();






app.use(sessiondConfig)
app.use(cookieParser());
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.get("/test",(req,res)=>{
  res.send("Respuesta!")
  
})


app.use('/', indexeRouter);

app.get("/current",passportCall("jwt",{session:false}),authorization("admin"),(req, res) => { res.send(req.user); });








app.get('/operacion', async (req, res) => {
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
export default app;



















 








