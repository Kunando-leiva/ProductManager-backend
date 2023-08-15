import { Router } from "express";
import viewRouter from "./viewRouter.js";
import sessionsRouter from "./session.router.js";
import ProductosRouter from './Productos.router.js';
import CartRouter from './carritos.router.js';
import MessagesRouter from './messages.router.js'; 

const router = Router();router

const productosRouter = new ProductosRouter();
const sessionRouter = new sessionsRouter();
const messagesRouter = new MessagesRouter(); 

router.use('/', viewRouter);
router.use('/productos', productosRouter.getRouter());
router.use('/carrito', CartRouter);
router.use('/mensajes', messagesRouter.getRouter()); 
router.use('/sessions', sessionRouter.getRouter());


export default router;