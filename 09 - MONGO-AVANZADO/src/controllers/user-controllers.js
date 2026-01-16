import { userManager } from "../managers/user-manager.js";
import { createUsers } from "../utils/user-utils.js";

class UserControllers {
  constructor(manager) {
    this.manager = manager;
  }

  getAll = async (req, res) => {
    try {
      const { page, limit, last_name, sort } = req.query;
      const response = await this.manager.getAll(page, limit, last_name, sort);
      const nextPage = response.hasNextPage
        ? `http://localhost:8080/users?page=${response.nextPage}`
        : null;
      const prevPage = response.hasPrevPage
        ? `http://localhost:8080/users?page=${response.prevPage}`
        : null;
      res.json({
        payload: response.docs,
        info: {
          count: response.totalDocs,
          totalPages: response.totalPages,
          nextLink: nextPage,
          prevLink: prevPage,
          hasPrevPage: response.hasPrevPage,
          hasNextPage: response.hasNextPage,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.getById(id);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  getByName = async (req, res) => {
    try {
      const { name } = req.query;
      const response = await this.manager.getByName(name);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const response = await this.manager.create(req.body);
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.update(id, req.body);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const response = await this.manager.delete(id);
      if (!response) throw new Error("Usuario no encontrado");
      return res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  createManyUsers = async (req, res) => {
    try {
      const data = createUsers();
      const response = await this.manager.create(data);
      res.json({ message: `${response.length} usuarios creados` });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //controlador addPetToUser ↓↓↓
  addPetToUser = async (req, res) => {
    try {
      const { userId, petId } = req.params; //recibo userId y petId x params
      const response = await this.manager.addPetToUser(userId, petId); //llamo al manager; paso los 2 ids
      if (!response) throw new Error("Usuario no encontrado"); 
      return res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  aggregation = async (req, res) => {
    try {
      const response = await this.manager.aggregation();
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export const userControllers = new UserControllers(userManager);