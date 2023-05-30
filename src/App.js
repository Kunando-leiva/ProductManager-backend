import express from "express";
import fs from "fs";


const App = express();

App.get('/', function(req, res) {
  res.send(
    '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 98vh; background-color: black;">' +
    '<h1 style="color: green; text-align: center;">BIENVENIDOS AL PONY PISADOR</h1>' +
    '<h2 style="color: green; text-align: center;"><a href="/products" style="color: green; ">Ver los Productos</a></h2>' +
    '<h2 style="color: green; text-align: center;"><a href="/products/2" style="color: green; ">Ruta /products/:id </a></h2>' +
    '<h2 style="color: green; text-align: center;"><a href="/products?limit=5" style="color: green; ">Ruta /products?limit=5 </a></h2>' +
  '</div>'
  

  

  );
});

App.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer los productos");
      return;
    }

    const products = JSON.parse(data);
    const product = products.find((product) => product.id === productId);

    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }

    res.json(product);
    
  });
});

App.get("/products", (req, res) => {
  const limit = parseInt(req.query.limit) || 12;

  fs.readFile("./products.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al leer los productos");
      return;
    }

    const products = JSON.parse(data);
    const limitedProducts = products.slice(0, limit);

    res.json(limitedProducts);
    

    
  });
});

App.listen(8080, () => {
  console.log("VISTO DEL SERVE 8080");
});