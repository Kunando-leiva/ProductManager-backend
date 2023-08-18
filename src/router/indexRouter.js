import express from "express";
import viewRouter from "./viewRouter.js";
import ProductRouter from "./product.router.js";
import CartRouter from '../controllers/Cart/carts.controller.js';
import MessagesRouter from './messages.router.js'; 
import UserRouter from "../controllers/user/users.controller.js";

const router = express.Router();

// Aquí estás usando los routers importados con el método use()
router.use('/', viewRouter);
router.use('/productos', ProductRouter);
router.use('/Cart', CartRouter);
router.use('/mensajes', MessagesRouter);
router.use('/sessions', UserRouter);

export default router;
