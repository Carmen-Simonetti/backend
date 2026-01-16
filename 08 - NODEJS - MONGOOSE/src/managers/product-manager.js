import { ProductModel } from "../models/product-model.js";

//METODOS DE MONGOOES PARA MANIPULAR LOS DOCS 


class ProductManager {
  constructor(model) {
    this.model = model;
  }

  async getAll() { //getAll llama al método q retorna el find (.find = método de mongoose)
    try {
      return await this.model.find({});
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(body) { 
    try {
      return await this.model.create(body); //(.create = método de mongoose)
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {  //realiza la búsqueda por Id
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, body) { //
    try {
      return await this.model.findByIdAndUpdate(id, body, { new: true }); //lleva un tercer parámetro para q nos devuelva el doc ya actualizado
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const productManager = new ProductManager(ProductModel);