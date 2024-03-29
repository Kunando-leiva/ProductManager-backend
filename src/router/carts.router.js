import express from 'express';
import ProductDao from '../controllers/Products/Products.controller.js';
import CartDao from '../dao/factory.cart.js';
import CartController from '../controllers/Cart/carts.controller.js';

import passportCall from '../utils/passportcall.util.js';
import authorization from '../middlewares/auth.middleware.js';
import { cartRepositoryIndex, productsRepositoryIndex } from '../repositories/index.repositorie.js';

const router = express.Router();
const productDao = new ProductDao();
const cartController = new CartController(CartDao, productDao, cartRepositoryIndex, productsRepositoryIndex);

router.post('/', cartController.createCart.bind(cartController));
router.get('/:cid', cartController.getCartById.bind(cartController));
router.post('/:cid/producto/:id', passportCall("jwt", { session: false }), authorization(['user']), cartController.addProductToCart.bind(cartController));
router.delete('/:cid/producto/:id', cartController.deleteProductFromCart.bind(cartController));
router.post('/:cid/purchase', cartController.purchaseCart);

export default router;
