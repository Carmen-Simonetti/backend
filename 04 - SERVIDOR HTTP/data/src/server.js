import express from "express";
import { productManager } from "./managers/product-manager.js";

const server = express();
const port = 8000;

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.get("/api/products", async (req, res) => {
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

server.post("/api/products", async (req, res) => {
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

/* ------------------------------------ - ----------------------------------- */

server.post("/api/carts", (req, res) => {
  //cartManager.create()
});

server.get("/api/carts/:cid", (req, res) => {});

server.post("/api/carts/:cid/product/:pid", (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  //cartManager.addProdToCart(cid, pid)
});


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});