import  Express  from "express"; 
import ProductosManager from "../dao/db/manager/producto.js";
import CarritoManager from "../dao/db/manager/carrito.js";
import MensajeManager from "../dao/db/manager/mensajes.js";
import { Server } from "socket.io";


const io = new Server();
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

const productos = await productoManager.getProducto();

let data= {
  name: "pony pisador",
  description: "El mejor lugar para comprar tus productos de la tierra media",
  role: "user",
}
  res.render("home", {
    data,
    style:"styles.css",
    isAdmin: data.role === "user",
    productos,

  });

});




router.get("/realTimeProducts", async (req, res) => {

  const productos = await productoManager.getProducto();


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
});

router.get("/carritohandlebars", async (req, res) => {
  const id = req.params.id;
  

  const carrito = await carritoManager.getCarritoById(id);


  let datacarrito = {
    titulo: "carrito",
    description: "El mejor lugar para comprar tus productos de la tierra media",
    role: "admin",
  }
  res.render("carrito", {
    datacarrito,
    style:"styles.css",
    isAdmin: datacarrito.role === "admin",
    carrito,
  });
});

router.get("/api", async (req, res) => {
    const productos = await productoManager.getProducto();
    res.json( productos );
});

router.get('/chat', (req, res) => {
  res.render("chat", {
    style: "styles.css",
  });
});

router.get("/api/mensajes", async (req, res) => {
  const mensajes = await mensajeManager.getMensajes();
  res.json(mensajes);
});





export default router;