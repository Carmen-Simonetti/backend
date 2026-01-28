import { UserModel } from "../models/user-model.js"; //modelo de mongoose (users)
import { PetModel } from "../models/pet-model.js"; //modelo de mascotas; PetModel no se usa directamente, sólo guardo el petId en el usuario

//!------------El manager es el que habla con MongoDB; El controller sólo lo llama 
class UserManager { //Hablar con la base de datos
  constructor(model) {
    this.model = model;//luego de crear el manager le paso el modelo
  }

  getAll = async (page = 1, limit = 10, last_name, sort) => { //paginacion, cantidad por páginas, filtros, ordenamiento
    try {
      const filter = last_name ? { last_name: last_name } : {};
//filtro por apellido y sino traigo todos
      let sortOrder = {};

      if(sort) sortOrder.last_name = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null

      return await this.model.paginate(filter, { page, limit, sort: sortOrder }); //mongoose-paginate
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      // const { executionStats } = await this.model.findById(id).explain();
      // return executionStats;
      return await this.model.findById(id).populate("mascotas");  //.populate("nombre de la propiedad a rellenar")
    } catch (error) {
      throw new Error(error);
    }
  };

  getByName = async (name) => {
    try {
      const response = await this.model.findOne({ first_name: name }).explain();
      return response.executionStats;
    } catch (error) {
      throw new Error(error);
    }
  };

  //?-------------CRUD = Create Read Update Delete

  create = async (body) => { //inserto un usuario nuevo
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, body) => { //Mongo busca el doc con ese _id y (body) se actualiza el usuario
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true }); //devuelve el doc actualizado con id o false devuelve el doc viejo
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  addPetToUser = async (userId, petId) => { //método que agrega mascotas al usuario
    try {
      return await this.model.findByIdAndUpdate(
        userId, //buscamos por userId
        { $push: { mascotas: petId } }, //guardo el petId dentro del array pets
        { new: true } //devuelvo el doc actualizado 
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  //3 stage (cada stage hace un cambio en los datos)↓↓
  aggregation = async () => { //ESTADÍSTICAS
    try {
      return await this.model.aggregate([
        // {
        //   $match: {  //filtra docs
        //     age: { $gte: 18 }
        //   }
        // },
        {
          $group: {       //agrupo 
            _id: "$gender", //por género
            // promedio_edad: { $avg: "$age" },
            cantidad: { $sum: 1 } //veo cuantos hay en cada grupo
          }
        },
        {
          $sort: { cantidad: -1 }  //ordeno de mayor a menor 
        }
      ]) 
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const userManager = new UserManager(UserModel); //Instancia lista para usar en el controller