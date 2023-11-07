import express from "express";
import handlebars from "express-handlebars";
import passport from 'passport';
import initializePassport from './middlewares/authentication/passport.config.js';
import morgan from "morgan";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import indexeRouter from './router/indexRouter.js';
import MongoSingleton from "./config/mongoSingleton.js";
import cors from "cors"
import sessiondConfig from "../db/sessiondbConfig.js";
import mongoConnect from "../db/index.js";
import { addLogger } from "./utils/logger.js";
import http from "http";
import setupSockets from "./utils/socket.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import multer from "multer";



const app = express(); app.use(addLogger)
const server = http.createServer(app);setupSockets(server);
mongoConnect()

app.use(morgan("dev"));
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(multer().any());
const mongoIntance = MongoSingleton.getInstance();

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación Proyecto Backend!!!",
      description: "La documentación de los endpoints",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));





app.use(sessiondConfig)
app.use(cookieParser());
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(cors())

app.use('/', indexeRouter);


export default app;



















 








