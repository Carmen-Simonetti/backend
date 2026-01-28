import { Router } from "express";
import { cartControllers } from "../controllers/cart-controllers.js";

const router = Router();

//POST /carts ↓↓↓
router.post("/", cartControllers.create); //Crea un carrito vacío y devuelve el carrito con su _id

//GET /carts/:cid ↓↓↓
router.get("/:cid", cartControllers.getById); //Trae un carrito x ID; Usa populate para traer productos completos

//POST /carts/:cid/product/:pid ↓↓↓
router.post("/:cid/product/:pid", cartControllers.addProduct); //si el producto ya está --> suma quantity, si no está lo agrega; No duplica producto y usa populate

export default router;
