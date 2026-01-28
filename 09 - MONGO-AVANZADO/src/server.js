import express from "express";
import { initMongoDB } from "./config/connection.js";
import productRouter from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";
import petRouter from "./routes/pet-router.js";
import cartRouter from "./routes/cart-router.js";

//creo la aplicacion Express ↓↓
const app = express();
//escucha el puerto. Es el módulo principal. Configura todo. Tiene todas las rutas.
//Middlewares
app.use(express.json()); //Middlewares que permite que Express lea JSON que viene en el body de la request.
app.use(express.urlencoded({ extended: true })); //Middlewares que permite leer datos que vienen de: formularios HTML y datos tipo key=value&key2=value2

//rutas
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/pets", petRouter);

//Conecto Mongo una sola vez cuando se levanta el servidor
initMongoDB()
  .then(() => console.log("Base de datos conectada")) //METODO QUE INICIA CONEXIÓN CON MONGO
  .catch((err) => console.log(err));

  //carrito 
  app.use("/carts", cartRouter);
  
const PORT = process.env.PORT || 8080;

// Archivo principal: inicializa Express, conecta MongoDB y monta los routers↓↓
app.listen(PORT, () => {
  console.log(`Server ok, puerto ${PORT}`);
});