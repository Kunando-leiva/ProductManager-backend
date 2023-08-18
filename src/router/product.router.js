import express from 'express';
import ProductsController from '../controllers/Products/Products.controller.js';

const router = express.Router();



router.get('/home.handlebars', ProductsController.getProducts);
router.post('/', ProductsController.createProducto);





export default router;
