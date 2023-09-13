
import Productdao from "../dao/factory.producto.js"; 
import ProductsRepository from "./product.repository.js"; 
export const productsRepositoryIndex = new ProductsRepository(Productdao);

import Userdao from "../dao/factory.user.js";
import UserRepository from "./User.repository.js";
export const UserRepositoryIndex = new UserRepository(Userdao)

import cartDao from "../dao/factory.cart.js";
import cartRepository from "./cart.repository.js"
export const cartRepositoryIndex = new cartRepository(cartDao)

import Chatdao from "../dao/factory.chat.js";
import chatrepository from "./chat.repository.js"
export const chatRepositoryIndex = new chatrepository(Chatdao)


