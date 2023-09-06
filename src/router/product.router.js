import express from "express";
import ProductController from "../controllers/Products/Products.controller.js";
import ProductDao from "../dao/factory.js";

import passportCall from "../utils/passportcall.util.js";
import authorization from "../middlewares/auth.middleware.js";

const router = express.Router();

const productController = new ProductController(ProductDao);

router.post("/", productController.createProduct.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.get("/", productController.getAllProducts.bind(productController));
router.put("/:id", passportCall("jwt",{session:false}),authorization("admin"), productController.updateProduct.bind(productController));
router.delete("/:id", passportCall("jwt",{session:false}),authorization("admin"), productController.deleteProduct.bind(productController));

// Agrega más rutas según tus necesidades

export default router;