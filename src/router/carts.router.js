import  Express  from "express";
import CartController from "../controllers/Cart/carts.controller.js";


const router = Express.Router();

router.get("/", CartController.getCart);
router.post("/", CartController.createCart);
router.put("/:id", CartController.updateCart);
router.delete("/:id", CartController.deleteCart);
