import { productManager } from "../managers/product-manager.js";

class ProductControllers {
  constructor(manager) {
    this.manager = manager;
  }

  getAll = async(req, res)=> {
    try {
      const response = await this.manager.getAll();
      res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const response = await this.manager.getById(id);
      if (!response) throw new Error("Producto no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  create = async(req, res) => {
    try {
      const response = await this.manager.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const response = await this.manager.update(id, req.body);
      if (!response) throw new Error("Producto no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await this.manager.delete(id);
      if (!response) throw new Error("Producto no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

export const productControllers = new ProductControllers(productManager);