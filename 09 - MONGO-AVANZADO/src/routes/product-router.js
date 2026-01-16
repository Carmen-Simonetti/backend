import { Router } from "express";
import { productControllers } from "../controllers/product-controllers.js";

//ENRUTADOR 

const router = Router();

//ENDPOINTS ↓↓↓
// url + INSTANCIA DE CONTROLLERS
router.get("/", productControllers.getAll);
router.get("/:id", productControllers.getById);
router.post("/", productControllers.create);
router.put("/:id", productControllers.update);
router.delete("/:id", productControllers.delete);

export default router;