import { userManager } from "../managers/user-manager.js"; //user-manager es el objeto que usa MongoDB (modelos, mongoose, paginate, etc.)
import { createUsers } from "../utils/user-utils.js";  //createUsers crea muchos usuarios “fake” (para pruebas)

//?----------CRUD, paginación, filtros y relaciones con mascotas (el controller no toca la base de datos directamente)---?↓↓↓

class UserControllers { //El controller recibe un manager (conecto controller con manager)
  constructor(manager) {
    this.manager = manager; //lo guarda acá 
  }

  getAll = async (req, res) => { //traigo usuarios
    try {
      const { page, limit, last_name, sort } = req.query; //Leo parámetros de la URL(qué le pido a DB). la base de datos devuelve sólo los datos de la página que pido  para después filtrarlos en memoria
      const response = await this.manager.getAll(page, limit, last_name, sort); //el controller espera, el manager usa mongoose-paginate. Mongo DB devuelve sólo la pagina pedida con info extra de paginación
      const nextPage = response.hasNextPage
        ? `http://localhost:8080/users?page=${response.nextPage}`
        : null;
      const prevPage = response.hasPrevPage
        ? `http://localhost:8080/users?page=${response.prevPage}`
        : null;
      res.json({ //armo rta formateada
        payload: response.docs, //usuarios de ESA página
        info: { //metadatos de paginación
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

  getById = async (req, res) => { //Leo UN usuario
    try {
      const { id } = req.params; //req.params viene de la URL
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
      const response = await this.manager.create(req.body); //req.body trae el usuario desde Postman o frontend
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