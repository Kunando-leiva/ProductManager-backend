import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "./config.js";

import configureDatabase from "./db.config.js";

const app = express
const httpServer = createServer(app);
const io = new Server(httpServer);

configureDatabase()

httpServer.listen(config.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${config.PORT}`);
});

export {io}