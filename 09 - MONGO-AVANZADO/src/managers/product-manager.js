import { ProductModel } from "../models/product-model.js";

//METODOS DE MONGOOES PARA MANIPULAR LOS DOCS 


class ProductManager {
  constructor(model) {
    this.model = model;
  }

getAll = async (page = 1, limit = 10, query, sort) => {
  try {
    const filter = {};
if (query) {
  if (query === "available") {
    filter.stock = { $gt: 0 };
  } else {
    filter.section = query; //búsqueda por section
  }
}
    const sortOption = {};
    if (sort) {
      sortOption.price = sort === "asc" ? 1 : -1;
    }

    const result = await this.model.paginate(filter, {
      page,
      limit,
      sort: sortOption,
      lean: true
    });

    return {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${limit}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${limit}`
        : null
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

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