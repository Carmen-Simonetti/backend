import { productManager } from "../managers/product-manager.js";

//El controller recibe la request del cliente, llama al manager para ejecutar la lógica de negocio y devuelve la respuesta
//↓↓↓ EL CONTROLLER RECIBE POR CONSTRUCTOR AL MANAGER ↓↓↓

class ProductControllers {
    // Recibe el manager por constructor ↓
  constructor(manager) {
    this.manager = manager;
  }
  // GET /products ↓
  // TRAIGO TODOS los productos
  getAll = async(req, res)=> {
    try {
      const response = await this.manager.getAll(); //llama al manager que traiga todos los productos
      res.json(response); // devuelve respuesta al cliente
    } catch (error) {
      res.status(400).json(error);
    }
  }
  // GET /products/:id  ↓
  // BÚSQUEDA por id
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
  // POST /products ↓
  // CREO un nuevo producto
  create = async(req, res) => {
    try {
      const response = await this.manager.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  // PUT /products/:id ↓
  // Actualiza un producto por id
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
  // DELETE /products/:id ↓
  // ELIMINO un producto por id
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

export const productControllers = new ProductControllers(productManager); //Se crea una instanci. Se le pasa el manager