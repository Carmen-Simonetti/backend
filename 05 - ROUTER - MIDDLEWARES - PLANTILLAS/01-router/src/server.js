




//?...........................................EN ESTE SERVER TENGO TODO API--------------//


import express from "express"; 
import productRouter from "./routes/product-router.js"; //importo product-router.js 
import cartRouter from "./routes/cart-router.js"; //importo cart Router 
import { loggerHttp } from "./middlewares/logger-http.js"; 



const server = express(); 

const port = 8000; 


server.use(express.json()); 

server.use(loggerHttp); 

server.use(express.static("public")); //middlewares "static" 

 

//Cómo inicializo este enrutador? 

server.use('/api/products', productRouter);  //acá estoy ENRUTANDO: acá le digo que todas las peticiones que entra las envíe a productRouter 

server.use('/api/carts', cartRouter); //agrego ENRUTADOR 

 

server.listen(port, () => { 

  console.log(`Server listening on port ${port}`); 

}); 