import { Router } from "express";
import { productManager } from "../managers/product-manager.js";
import { productValidator } from "../middlewares/product-validator.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getById(id);
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", [productValidator], async (req, res) => {
  try {
    const newProduct = await productManager.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/test-multer", upload.single("image"), async (req, res) => {
  try {
    console.log(req.file);
    const newProduct = await productManager.create({
      ...req.body,
      image: req.file.path,
    });
    res.status(201).json(newProduct);
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

export default router;