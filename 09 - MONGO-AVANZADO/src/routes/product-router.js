import { Router } from "express";
import { productControllers } from "../controllers/product-controllers.js";

//ENRUTADOR 

const router = Router(); //no es el servidor principal es un submódulo express es el principal, no escucha express sí escucha el puerto, se encarga SÓLO de una parte a diferencia de express que configura todo, y tiene rutas específicas a diferencia de server que tiene todas. 

//ENDPOINTS ↓↓↓
// url + INSTANCIA DE CONTROLLERS
router.get("/", productControllers.getAll);
router.get("/:id", productControllers.getById);
router.post("/", productControllers.create);
router.put("/:id", productControllers.update);
router.delete("/:id", productControllers.delete);

export default router;