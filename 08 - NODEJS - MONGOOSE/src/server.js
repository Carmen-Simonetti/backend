import express from "express";
import { initMongoDB } from "./config/connection.js";
import productRouter from "./routes/product-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

initMongoDB()
  .then(() => console.log("Base de datos conectada")) //METODO QUE INICIA CONEXIÓN CON MONGO
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server ok, puerto ${PORT}`);
});