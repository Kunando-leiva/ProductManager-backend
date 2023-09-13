import mongoConnect from "../../db/index.js";
import { persistence } from "../config/app.config.js";

let cartDao

switch (persistence) {
  
  case "memory":
    const { default: CartManager } = await import("./memory/cartManager.js");
    cartDao = new CartManager();
    break;
  case "mongo":
    mongoConnect();
    const { default: CartDao } = await import("./db/carrito.dao.js");
    cartDao = new CartDao();
    break;
}

export default cartDao;