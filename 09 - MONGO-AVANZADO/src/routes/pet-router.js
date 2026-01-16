import { Router } from "express";
import { petControllers } from "../controllers/pet-controllers.js";

const router = Router();

router.post("/create-many", petControllers.createManyPets);

export default router;
