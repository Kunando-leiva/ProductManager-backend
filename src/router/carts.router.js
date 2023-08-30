import express from 'express';
import CartController from '../controllers/Cart/carts.controller.js';
import CartDao from '../dao/db/manager/carrito.dao.js';
import CartService from "../services/Cart.service.js";
import passportCall from '../utils/passportcall.util.js';
import ProductService from '../services/ProductService.js';
import ProductDao from '../dao/db/manager/productos.dao.js';

const router = express.Router();

const cartDao = new CartDao();
const productDao = new ProductDao();
const cartService = new CartService(cartDao,productDao);
const productService = new ProductService(productDao)
const cartController = new CartController(cartService,productService);



router.post('/', cartController.createCart.bind(cartController));
router.get('/:cid', cartController.getCartById.bind(cartController));
router.post('/:cid/producto/:pid',  cartController.addProductToCart.bind(cartController));
router.delete('/:cid/producto/:pid', cartController.deleteProductFromCart.bind(cartController));
export default router;
