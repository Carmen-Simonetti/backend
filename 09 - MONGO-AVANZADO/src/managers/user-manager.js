import { UserModel } from "../models/user-model.js";
import { PetModel } from "../models/pet-model.js";

class UserManager {
  constructor(model) {
    this.model = model;
  }

  getAll = async (page = 1, limit = 10, last_name, sort) => {
    try {
      const filter = last_name ? { last_name: last_name } : {};

      let sortOrder = {};

      if(sort) sortOrder.last_name = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null

      return await this.model.paginate(filter, { page, limit, sort: sortOrder });
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

  create = async (body) => {
    try {
      return await this.model.create(body);
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (id, body) => {
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true });
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
  aggregation = async () => {
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

export const userManager = new UserManager(UserModel);