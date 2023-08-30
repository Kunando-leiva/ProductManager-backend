import express from "express";
import viewRouter from "./viewRouter.js";
import ProductRouter from "./product.router.js";
import CartRouter from "./carts.router.js";
import MessagesRouter from './messages.router.js'; 
import UserRouter from "./user.router.js";
import cors from "cors"

const router = express.Router();

router.use(cors())

router.use('/', viewRouter);
router.use('/productos', ProductRouter);
router.use('/Cart', CartRouter);
router.use('/mensajes', MessagesRouter);
router.use('/sessions', UserRouter);




export default router;
