import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view-router.js";
import userRouter from "./routes/user-router2.js"
import productRouter from "./routes/product-router.js";
import cartRouter from "./routes/cart-router.js";



//?------------------------------------ESTO ES UNA API -----------------------------------------------------
const server = express();
const port = 8000;

// middlewares para formularios y JSON
server.use(express.urlencoded({ extended: true })); //para POST de formulario
server.use(express.json()); //para POST de formulario

// handlebars
server.engine("handlebars", handlebars.engine()); //le  digo que la extensión va a ser handlebars
server.set("view engine", "handlebars");
server.set("views", `${process.cwd()}/src/views`);

// estáticos
server.use(express.static(`${process.cwd()}/src/public`));

//rutas
console.log("🟡 MONTANDO /api/users");
server.use('/api/users', userRouter); //api/users viene de user-router2.js.
server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use("/", viewsRouter); //register viene de view-router.js


server.listen(port, () => {
  console.log(`Server handlebars listening on port ${port}`);
});
