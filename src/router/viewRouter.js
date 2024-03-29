import ViewsController from "../controllers/views/views.controller.js";
import express from "express";
import passportCall from "../utils/passportcall.util.js";
import authorization from "../middlewares/auth.middleware.js";
import ProductDao from "../dao/db/productos.dao.js";
import CartDao from "../dao/db/models/cartsModel.js";
import UserDao from "../dao/db/models/userModel.js";
import ChatDao from "../dao/db/mensajes.dao.js";

const router = express.Router();
const productDao = new ProductDao();
const cartDao = new CartDao();
const userDao = new UserDao();
const chatDao = new ChatDao()

const viewsController = new ViewsController(productDao, cartDao, userDao, chatDao);

router.get("/home", viewsController.getHome.bind(viewsController))
router.get("/", viewsController.getLogin.bind(viewsController));
router.get("/register", viewsController.getRegister.bind(viewsController));
router.get("/menu",passportCall("jwt"),authorization(["admin","user"]), viewsController.getMenu.bind(ViewsController));
router.get("/carrito", viewsController.getCartById.bind(viewsController));
router.get("/realTimeProducts",passportCall("jwt"),authorization("admin"), viewsController.getRealTimeProducts.bind(viewsController));
router.get("/chat", viewsController.getMensajes.bind(viewsController))


export default router;