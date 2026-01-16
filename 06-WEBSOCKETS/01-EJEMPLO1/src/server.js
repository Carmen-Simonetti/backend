import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.get("/home", (req, res) => {   //home
   res.render("home", { products });
});


app.get("/", (req, res) => { //vista
  res.render("websocket");
});

const httpServer = app.listen(3000, () => {
  console.log("Escuchando al puerto 3000");
});

const socketServer = new Server(httpServer); 

const products = [];

const realtimeProducts = [];

socketServer.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);

  socket.emit("mensaje-server", "Bienvenido a websockets");

  socket.on("mensaje-client", (message) => {
    console.log(message);
  });

  socketServer.emit('array-productos', products);

  socket.on('new-product', (obj) => {
    products.push(obj);
    socketServer.emit('array-productos', products);
  })
    // ===== REAL TIME PRODUCTS =====

  // enviar lista inicial
  socket.emit("products", realtimeProducts);

  // agregar producto realtime
  socket.on("new-product", (product) => {
    const newProduct = {
      id: uuidv4(),
      ...product
    };

    realtimeProducts.push(newProduct);
    products.push(newProduct);
    socketServer.emit("products", realtimeProducts);
  });

  // eliminar producto realtime
  socket.on("delete-product", (id) => {
    const updated = realtimeProducts.filter(p => p.id !== id);
    realtimeProducts.length = 0;
    realtimeProducts.push(...updated);

    socketServer.emit("products", realtimeProducts);
  });

});