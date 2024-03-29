import express from "express";
import viewRouter from "./viewRouter.js";
import ProductRouter from "./product.router.js";
import CartRouter from "./carts.router.js";
import MessagesRouter from './messages.router.js'; 
import UserRouter from "./user.router.js";
import ticketRouter from "./ticket.router.js"
import configureCors from "../middlewares/cors.middleware.js";
import mockProducts from "./mockProducts.router.js";
import errorHandler from "../middlewares/error/errorHandler.js";
import passportCall from "../utils/passportcall.util.js";
import authorization from "../middlewares/auth.middleware.js";
import  Logger  from "./Logger.Router.js";

const router = express.Router();

configureCors(router)

router.use('/', viewRouter);
router.use('/productos', ProductRouter);
router.use('/Cart', CartRouter);
router.use('/chat', MessagesRouter);
router.use('/sessions', UserRouter);
router.use('/ticket', ticketRouter);
router.use('/mockProducts', mockProducts)
router.get("/current",passportCall("jwt",{session:false}),authorization("admin"),(req, res) => { res.send(req.user); });
router.use("/", Logger)
router.use(errorHandler)




export default router;
