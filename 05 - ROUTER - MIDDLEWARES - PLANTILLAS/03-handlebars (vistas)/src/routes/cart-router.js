import { Router } from "express";

const router = Router();

router.post("/api/carts", (req, res) => {
  //cartManager.create()
});

router.get("/api/carts/:cid", (req, res) => {});

router.post("/api/carts/:cid/product/:pid", (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  //cartManager.addProdToCart(cid, pid)
});

export default router;