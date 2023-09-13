import express from 'express';
import CartController from '../controllers/Cart/carts.controller.js';
import cartDao from '../dao/factory.cart.js';

import passportCall from '../utils/passportcall.util.js';

import ProductDao from '../dao/factory.producto.js';
import authorization from '../middlewares/auth.middleware.js';

const router = express.Router();




const cartController = new CartController(cartDao, ProductDao);



router.post('/', cartController.createCart.bind(cartController));
router.get('/:cid', cartController.getCartById.bind(cartController));
router.post('/:cid/producto/:pid', passportCall("jwt",{session:false}),authorization("user"),  cartController.addProductToCart.bind(cartController));
router.delete('/:cid/producto/:pid', cartController.deleteProductFromCart.bind(cartController));
router.post('/:cid/purchase', cartController.purchaseCart);
export default router;
