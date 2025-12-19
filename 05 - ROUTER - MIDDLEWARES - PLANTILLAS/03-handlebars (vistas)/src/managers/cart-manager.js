import { v4 as uuidv4 } from "uuid";
import { productManager } from "./product-manager.js";
import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.prodManager = productManager;
  }

  getAll = async () => { //leo el archivo
    if (!fs.existsSync(this.path)) return [];
    const carts = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(carts)};

    getById = async (id) => { //busco el carrito
    const carts = await this.getAll();
    const cart = carts.find((c) => c.id === id);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
    };
  
    create = async () => {
    try {
      const cart = { //hago carrito vacío
        id: uuidv4(),
        products: [],
      }; 
      const carts = await this.getAll();                               //Leo el archivo carts.json 
      carts.push(cart);                                                //Agrego el nuevo carrito al array
      await fs.promises.writeFile(this.path, JSON.stringify(carts));   //Guardo el archivo actualizado
      //fs: módulo nativo de Node para manejar archivos. 
      //writeFile sirve para escribir escribir un archivo, sobreescribir y/o crear uno si no existe, 
      //(this.path, JSON.stringify(carts)): convierto a texto y escribo en carts.json 
      return cart;                                                     // retorno carrito creado
    } catch (error) {
      throw new Error(error);}
  };

  

  addProdToCart = async (idCart, idProd) => {
    const product = await this.prodManager.getById(idProd);//prodManager.getById(idProd): verifico si el producto existe
if (!product) return console.log("el producto no existe");
const carts = await this.getAll(); //espero los carriitos
const cart = carts.find(c => c.id === idCart); //busco entre todos los carritos con el id un determinado carrito 
if (!cart) return console.log("el carrito no existe"); //si no está ese carrito retorno esto
const item = cart.products.find(p => p.product === idProd); //busco si el producto está en el carrito
if (item) {
  item.quantity++; //si existe le sumo 1 
}
else {
  cart.products.push({ //y si no existe lo pusheo
    product: idProd,
    quantity: 1
  });
}
await fs.promises.writeFile(this.path, JSON.stringify(carts)); //espero y actualizo sobreescribiendo el archivo
  };
}

export const cartManager = new CartManager("./data/carts.json");