import  Express  from "express"; 
import CarritoManager from "../dao/db/manager/carrito.js";
import MensajeManager from "../dao/db/manager/mensajes.js";
import ProductosManager from "../dao/db/manager/producto.js";
import productoModel from "../dao/db/models/product.js";



const router = Express.Router();

const productoManager = new ProductosManager();
const carritoManager = new CarritoManager();
const mensajeManager = new MensajeManager();


router.get("/", async (req, res) => {
  res.render("menu",{ 
    style:"styles.css",
  });
});



// Obtener todos los productos y renderizar la vista
router.get("/home.handlebars", async (req, res) => {
  try {
    // Obtener los parámetros de la consulta
    const { page = 1, limit = 5, sort, query } = req.query;

    // Convertir los valores a números enteros (si son proporcionados)
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Crear un objeto para las opciones de paginación y filtrado
    const options = { page: pageNumber, limit: limitNumber, sort };

    // Crear un objeto para las opciones de búsqueda basadas en el query
    const searchOptions = {};

    // Si se proporciona un query, agregarlo a las opciones de búsqueda
    if (query) {
      searchOptions.category = query; // Suponemos que el query contiene el filtro por categoría
    }

    // Obtener los productos según las opciones de búsqueda y paginación
    const productos = await productoManager.getProductos(searchOptions, options);

    // Aquí puedes agregar más lógica si es necesario para manejar la consulta adicional

    // Datos adicionales que deseas pasar a la vista
    const data = {
      name: "pony pisador",
      description: "El mejor lugar para comprar tus productos de la Tierra Media",
      role: "user",
    };

    // Renderizar la vista home.handlebars con los datos proporcionados
    res.render("home.handlebars", {
      data,
      style: "styles.css",
      isAdmin: data.role === "user",
      productos: productos.docs, // productos es un objeto que contiene una propiedad "docs" con el array de productos
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      currentPage: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      prevLink: productos.prevLink,
      nextLink: productos.nextLink,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
});


router.get("/realTimeProducts", async (req, res) => {
  try {

  const productos = await productoManager.getProductos();
 
  let datatimereal = {
    titulo: "cargando productos en tiempo real",
    description: "El mejor lugar para comprar tus productos de la tierra media",
    role: "admin",
  }
  
  res.render("realTimeProducts", {
    datatimereal,
    style:"styles.css",
    isAdmin: datatimereal.role === "admin",
    productos,

  });

} catch (error) {
  console.log(error);
}
});




router.get("/carritohandlebars", async (req, res) => {
  try {
    const carritos = await carritoManager.getCarritos();
    res.render('carrito', { carritos });
  } catch (error) {
    console.error('Error al obtener los carritos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los carritos' });
  }
});




router.get('/chat', (req, res) => {
  res.render("chat", {
    style: "styles.css",
  });
});




router.get("/api/productos", async (req, res) => { 
  try {
    const productos = await productoManager.getProductos();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get("/api/mensajes", async (req, res) => {
  const mensajes = await mensajeManager.getMensajes();
  res.json(mensajes);
});

router.get("/api/carrito", async (req, res) => {
  const carritos = await carritoManager.getCarritos();
  res.json({ status: "ok", carritos });
});



router.get('/register',(req,res)=>{
  res.render('register');
})

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/profile',(req,res)=>{
  res.render('profile',{
      user:req.session.user
  })
})






export default router;