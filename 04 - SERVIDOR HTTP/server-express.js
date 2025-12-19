//GENERO UN SERVIDOR 
//?---------------------SERVER-EXPRESS = RUTAS -----------------------------------VER CLASE 18/11/2025 2:00:00

import express from "express";
import { productManager } from "./managers/product-manager.js";
import { cartManager } from "./managers/cart-manager.js";  //para usar cartManager dentro de las rutas.

const server = express(); //genero una instancia 
const port = 8080;        //pongo el puerto en una constante

server.use(express.json());

server.get("/", (req, res) => { //genero un endpoint, una URL
  res.send("Hello World!");
});

server.get("/api/products", async (req, res) => { //le decimos al endpoint que es de tipo GET; La URL: /api/products, la funcion callback que tiene objeto request y objeto response; 
  //EL REQUEST ES PARA PODER TOMAR LA INFO QUE ENVÍA EL USUARIO DESDE EL FROND (RES) realizar el proceso correspondiente en cada ruta y poder enviarle una respuesta ACOMPAÑADA DE UN CÓDIGO DE ESTADO
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getById(id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.post("/api/products", async (req, res) => { //para agregar un producto usar post
  try {
    const newProduct = await productManager.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.update(req.body, id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productManager.delete(id);
    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!---------------------------PRIMER ENTREGA-------------------!//

server.post("/api/carts", async (req, res) => { //RUTA PARA CREAR carrito
  try {
    const cart = await cartManager.create(); //llama a cartManager
    res.status(201).json(cart);  // devuelvo carrito creado
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/api/carts/:cid", async (req, res) => {//RUTA PARA ver carrito
try {
    const { cid } = req.params;               // tomo el id que viene por URL
    const cart = await cartManager.getById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

server.post("/api/carts/:cid/product/:pid", async (req, res) => { //agregar producto al carrito
  try {
    const { cid, pid } = req.params; // CID: id del carrito; PID: id del producto

    await cartManager.addProdToCart(cid, pid);      // agrego el producto
    const updated = await cartManager.getById(cid); // traigo carrito actualizado

    res.json(updated); // devuelvo carrito actualizado
  } catch (error) {
    res.status(500).send(error.message);
  }
});


server.listen(port, () => { //listen para que levante el servidor
  console.log(`Server listening on port ${port}`);
});
