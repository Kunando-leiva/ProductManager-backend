import ViewsController from "../controllers/views/views.controller.js";
import express from "express";
import passportCall from "../utils/passportcall.util.js";
import authorization from "../middlewares/auth.middleware.js";


import ProductDao from "../dao/db/productos.dao.js";
import CartDao from "../dao/db/carrito.dao.js";
import UserDao from "../dao/db/users.dao.js";
import ChatDao from "../dao/db/mensajes.dao.js";

const router = express.Router();



const productDao = new ProductDao();
const cartDao = new CartDao();
const userDao = new UserDao();
const chatDao = new ChatDao()

const viewsController = new ViewsController(productDao, cartDao, userDao, chatDao);



router.get("/home", viewsController.getHome.bind(viewsController))
router.get("/", viewsController.getLogin.bind(viewsController));
router.get("/register", viewsController.getRegister.bind(viewsController));
router.get("/menu", viewsController.getMenu);
router.get("/carrito", viewsController.getCart.bind(viewsController));
router.get("/realTimeProducts",passportCall("jwt"),authorization("admin"), viewsController.getRealTimeProducts.bind(viewsController));
router.get("/chat", viewsController.getMensajes.bind(viewsController))





export default router;















// import  Express  from "express"; 
// import CarritoManager from "../dao/db/manager/carrito.dao.js";
// import MensajeManager from "../dao/db/manager/mensajes.dao.js";
// import ProductosManager from "../dao/db/manager/productos.dao.js";
// import passportCall from "../utils/passportcall.util.js";
// import authorization from "../middlewares/auth.middleware.js";
// import ProductService from "../services/ProductService.js";




// const router = Express.Router();

// const productoManager = new ProductosManager();
// const carritoManager = new CarritoManager();
// const mensajeManager = new MensajeManager();


// router.get("/menu", async (req, res) => {
//   console.log("Estructura del objeto req.user:", req.user);
//   res.render("menu",{ 
//     user: req.user,
    

//     style:"styles.css",
    
//   });
// });




// router.get("/home.handlebars", async (req, res) => {
//   try {
    
//     // Obtener los parámetros de la consulta
//     const { page = 1, limit = 9, sort, query } = req.query;

//     // Convertir los valores a números enteros (si son proporcionados)
//     const pageNumber = parseInt(page);
//     const limitNumber = parseInt(limit);

//     // Crear un objeto para las opciones de paginación y filtrado
//     const options = { page: pageNumber, limit: limitNumber, sort };

//     // Crear un objeto para las opciones de búsqueda basadas en el query
//     const searchOptions = {};

//     // Si se proporciona un query, agregarlo a las opciones de búsqueda
//     if (query) {
//       searchOptions.category = query; // Suponemos que el query contiene el filtro por categoría
//     }

//     // Obtener los productos según las opciones de búsqueda y paginación
//     const productos = await ProductService.getProducts(searchOptions, options);
//     console.log(productos, "productos");
    

//     // Datos adicionales que deseas pasar a la vista
//     const data = {
//       name: "pony pisador",
//       description: "El mejor lugar para comprar tus productos de la Tierra Media",
//       role: "user",
//     };

//     // Renderizar la vista home.handlebars con los datos proporcionados
//     res.render("home.handlebars", {
//       data,
//       style: "styles.css",
//       isAdmin: data.role === "user",
//       productos: productos.docs, // productos es un objeto que contiene una propiedad "docs" con el array de productos
//       totalPages: productos.totalPages,
//       prevPage: productos.prevPage,
//       nextPage: productos.nextPage,
//       currentPage: productos.page,
//       hasPrevPage: productos.hasPrevPage,
//       hasNextPage: productos.hasNextPage,
//       prevLink: productos.prevLink,
//       nextLink: productos.nextLink,
      
//     });
//     console.log(req.user.role, "req.user.role");
//   } catch (error) {
//     console.error('Error al obtener los productos:', error);
//     res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
//   }
// });


// router.get("/realTimeProducts", passportCall("jwt"), authorization("admin"), async (req, res) => {
//   try {


//   const productos = await ProductService.getProducts();
 
//   let datatimereal = {
//     titulo: "cargando productos en tiempo real",
//     description: "El mejor lugar para comprar tus productos de la tierra media",
//     role: "admin",
//   }
  
//   res.render("realTimeProducts", {
//     datatimereal,
//     style:"styles.css",
//     isAdmin: datatimereal.role === "admin",
//     productos: productos.docs,
    

//   });

// } catch (error) {
//   console.log(error);
// }
// });




// router.get("/carritohandlebars", async (req, res) => {
//   try {
//     const carritos = await carritoManager.getCarritos();
//     res.render('carrito', { carritos });
//   } catch (error) {
//     console.error('Error al obtener los carritos:', error);
//     res.status(500).json({ status: 'error', message: 'Error al obtener los carritos' });
//   }
// });




// router.get('/chat', (req, res) => {
//   res.render("chat", {
//     style: "styles.css",
//   });
// });


// router.get("/api/productoss", async (req, res) => {
//   const productos = await ProductService.getProducts();
//   res.json(productos);
// });



// router.get("/api/mensajes", async (req, res) => {
//   const mensajes = await mensajeManager.getMensajes();
//   res.json(mensajes);
// });

// router.get("/api/carrito", async (req, res) => {
//   const carritos = await carritoManager.getCarritos();
//   res.json({ status: "ok", carritos });
// });




// router.get('/register',(req,res)=>{
//   res.render('register', {
//     style: "styles.css",
//     });
// })

// router.get('/',(req,res)=>{
//   res.render('login', {
//     style: "styles.css",
//     });
// })







// export default router;