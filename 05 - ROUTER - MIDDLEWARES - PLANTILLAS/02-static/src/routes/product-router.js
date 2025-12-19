import { Router } from "express";

import { productManager } from "../managers/product-manager.js"; //importo product manager ddesde product-manager.js 

//import { productValidator } from "../middlewares/product-validator.js"; 

import { upload } from "../middlewares/multer.js";

import { productValidator } from "../middlewares/product-validator.js";


const router = Router();

//abro cada uno de los endpoints con la instancia de router  


router.get("/", async (req, res) => {

  try {

    const products = await productManager.getAll();

    res.json(products);

  } catch (error) {

    res.status(500).send(error.message);

  }

});



router.get("/:id", async (req, res) => { //el req es la solicitud http que hace el cliente 

  try {

    const { id } = req.params;

    const product = await productManager.getById(id);

    res.json(product);

  } catch (error) {

    res.status(500).send(error.message);

  }

});



//el POST no recibe datos por URL, los recibe por body 



router.post("/", [productValidator], async (req, res) => { //antes del async se ejecuta productValidator, o sea antes de eso valido 

  try {

    const newProduct = await productManager.create(req.body); //recibe el body genera un id y lo guarda en archivo js 

    res.status(201).json(newProduct);  // 

  } catch (error) {

    res.status(500).send(error.message);

  }

});



//el POST no recibe datos por URL, los recibe por body. 

router.post("/test-multer", upload.single('image'), async (req, res) => { //con upload llamo a multer; puedo pasar un array de archivos o como ahora uno solo "single" y le paso el nombre de la propiedad x ejemplo la img del producto  

  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    if (!req.file) {
        return res.status(400).json({
          error: "No se recibió ninguna imagen. El campo debe llamarse 'image'"
        });}
    req.file  //dentro del objeto file tenemos una propiedad con el nombre path que es la ubicacion donde va a ir a parar la image 
    const newProduct = await productManager.create({ ...req.body, image: req.file.path }); //le digo create que además de lo que venga (...)en ".body", quiero que image sea req.file. la propiedad path DONDE VA A PARAR LA IMAGEN sería la URL de la imagen, la ubicacion 
    res.status(201).json(newProduct);  // 
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.put("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const product = await productManager.update(req.body, id);

    res.json(product);

  } catch (error) {

    res.status(500).send(error.message);

  }

});



router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    const response = await productManager.delete(id);

    res.json(response);

  } catch (error) {

    res.status(500).send(error.message);

  }

});



export default router; //exporto para poder darle un alias en el archivo de server 