import session from "express-session";
import MongoStore from "connect-mongo"; 
import mongoose from "mongoose"; // Importa mongoose si aún no lo has hecho
import { mongourl, key } from "../src/config/db.config.js"; 


const sessionConfig = session({
    store: new MongoStore({
        mongoUrl:"mongodb+srv://ferbostero91:Kun123@cluster0.68vapzi.mongodb.net/?retryWrites=true&w=majority",
    ttl: 3600, 
  }),
  secret:`${key}`,  
  resave: false,
  saveUninitialized: false,
});

export default sessionConfig;
