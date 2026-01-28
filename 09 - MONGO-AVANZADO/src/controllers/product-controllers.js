import { productManager } from "../managers/product-manager.js";

//?.------------PRODUCT-CONTROLLERS.JS: maneja req/res y delega la lógica al manager------------?//

class ProductControllers {
  constructor(manager) {
    this.manager = manager; //el manager guarda datos
  }

 getAll = async (req, res) => { //req --> lo que envía el cliente; res --> lo que yo devuelvo como rta
  try {
    // leo query params desde la URL
    const { page, limit, sort, query } = req.query; //req.query --> objeto con todo lo que venga en la URL después del ? NO se ve en la respuesta, se usa para decidir qué buscar en la DB; lo que el cliente pide express lo guarda en req.query despues el controller se lo pasa al manager; Mongo devuelve datos + metadata

    // llamo al manager (base de datos) ↓↓
    const response = await this.manager.getAll(
      page,
      limit,
      query,
      sort
    );

    // devuelvo el formato pedido por la consigna
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//Saco el id de la URL ↓↓↓
  async getById(req, res) {
    try {
      const { id } = req.params; //saco id de la URL
      const response = await this.manager.getById(id); //el controller llama al manager que busca el producto por ID
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