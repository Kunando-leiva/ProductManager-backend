import express from "express";
import ProductController from "../controllers/Products/Products.controller.js";
import ProductDao from "../dao/db/manager/productos.dao.js";
import ProductService from "../services/ProductService.js";

const router = express.Router();
const productDao = new ProductDao();
const productService = new ProductService(productDao);
const productController = new ProductController(productService);

router.post("/", productController.createProduct.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.get("/", productController.getAllProducts.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));

// Agrega más rutas según tus necesidades

export default router;