import mongoConnect from "../../db/index.js";
import { persistence } from "../config/app.config.js";

let Productdao

switch (persistence) {
  
  case "memory":
    const { default: ProductManager } = await import("./FileSystem/ProductManager.js");
    Productdao = new ProductManager();
    break;
  case "mongo":
    mongoConnect();
    const { default: ProductDao } = await import("./db/productos.dao.js");
    Productdao = new ProductDao();
    break;
}

export default Productdao;
