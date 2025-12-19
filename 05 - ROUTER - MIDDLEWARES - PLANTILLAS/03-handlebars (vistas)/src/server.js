import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/view-router.js";

const server = express();
const port = 8000;

server.engine("handlebars", handlebars.engine());
server.set("view engine", "handlebars");
server.set("views", `${process.cwd()}/src/views`);

server.use(express.static(`${process.cwd()}/src/public`));
server.use("/", viewsRouter);

server.listen(port, () => {
  console.log(`Server handlebars listening on port ${port}`);
});
