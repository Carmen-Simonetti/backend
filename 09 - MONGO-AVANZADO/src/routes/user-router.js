import { Router } from "express";
import { userControllers } from "../controllers/user-controllers.js";

const router = Router();

router.get("/", userControllers.getAll);            //Obtengo datos existentes: traigo usuarios
router.get("/by-id/:id", userControllers.getById);  //Obtengo datos existentes: traigo usuarios
router.post("/", userControllers.create);           //Guardo algo nuevo en base de datos: creo un usuario nuevo
router.post("/create-many", userControllers.createManyUsers); //Creo muchos usuarios de una vez
router.put("/:id", userControllers.update);         //Modifico algo existente: actualizo un usuario
router.delete("/:id", userControllers.delete);      //Borro datos: elimino un usuario
router.get("/by-name", userControllers.getByName);  //Busco por nombre
router.put("/add-pet/:userId/:petId", userControllers.addPetToUser); // Relaciono usuarios con mascotas
router.get("/aggregation", userControllers.aggregation);             //Agregaciones de Mongo: diltro datos, transformo, agrupo, etc.

export default router;