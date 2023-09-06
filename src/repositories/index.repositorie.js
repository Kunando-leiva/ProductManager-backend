import Productdao from "../dao/factory"; // Asegúrate de proporcionar la ruta correcta
import ProductsRepository from "./product.repository.js"; // Asegúrate de proporcionar la ruta correcta


const productsRepositoryIndex = new ProductsRepository(Productdao);


export default productsRepositoryIndex ;
