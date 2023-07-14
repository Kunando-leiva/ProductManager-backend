import  Express  from "express"; 
import { Server } from "socket.io";

import CarritoManager from "../dao/db/manager/carrito.js";
import MensajeManager from "../dao/db/manager/mensajes.js";
import ProductosManager from "../dao/db/manager/producto.js";



const router = Express.Router();



const productoManager = new ProductosManager();
const carritoManager = new CarritoManager();
const mensajeManager = new MensajeManager();


router.get("/", async (req, res) => {
  res.render("menu",{ 
    style:"styles.css",
  });
});

router.get("/home.handlebars", async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const options = { page: parseInt(page), limit: parseInt(limit) };
    const productos = await productoManager.getProductos({}, options);

    let data = {
      name: "pony pisador",
      description: "El mejor lugar para comprar tus productos de la tierra media",
      role: "user",
    };

    res.render("home.handlebars", {
      data,
      style: "styles.css",
      isAdmin: data.role === "user",
      productos,
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
  const { id } = req.params;
  const carrito = await carritoManager.getCarritoById(id);

  let datacarrito = {
    titulo: 'carrito',
    description: 'El mejor lugar para comprar tus productos de la tierra media',
    role: 'admin',
  };

  res.render('carrito', {
    datacarrito,
    style: 'styles.css',
    isAdmin: datacarrito.role === 'admin',
    carrito,
  });
});

router.get('/chat', (req, res) => {
  res.render("chat", {
    style: "styles.css",
  });
});


router.get("/api/productos", async (req, res) => {
    const productos = await productoManager.getProductos();
    res.json( productos );
});


router.get("/api/mensajes", async (req, res) => {
  const mensajes = await mensajeManager.getMensajes();
  res.json(mensajes);
});

router.get("/api/carrito", async (req, res) => {
  const carritos = await carritoManager.getCarritos();
  res.json({ status: "ok", carritos });
});








export default router;