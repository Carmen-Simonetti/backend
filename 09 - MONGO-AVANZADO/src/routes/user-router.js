import { Router } from "express";
import { userControllers } from "../controllers/user-controllers.js";

const router = Router();

router.get("/", userControllers.getAll);
router.get("/by-id/:id", userControllers.getById);
router.post("/", userControllers.create);
router.post("/create-many", userControllers.createManyUsers);
router.put("/:id", userControllers.update);
router.delete("/:id", userControllers.delete);
router.get("/by-name", userControllers.getByName);
router.put("/add-pet/:userId/:petId", userControllers.addPetToUser); //ruta mascotas 
router.get("/aggregation", userControllers.aggregation);

export default router;