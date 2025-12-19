import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  getAll = async () => { //Hago lista de todos los productos
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      }
      return [];
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => { //Busco por id
    try {
      const products = await this.getAll();
      const productExist = products.find((product) => product.id === id);
      if (!productExist) throw new Error("Product not found");
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  };

  create = async (obj) => {  //Creo  un producto con ID
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(error);
    }
  };

  update = async (obj, id) => { //Actualizo un producto sin cambiar el id
    try {
      const products = await this.getAll();
      let productExist = await this.getById(id);
      productExist = { ...productExist, ...obj };
      const newArray = products.filter((product) => product.id !== id);
      newArray.push(productExist);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return productExist;
    } catch (error) {
      throw new Error(error);
    }
  };

  delete = async (id) => { //Elimino producto por id
    try {
        const product = await this.getById(id);
        const products = await this.getAll();
        const newArray = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newArray));
        return `Producto con id: ${product.id} eliminado`;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const productManager = new ProductManager("./data/products.json");