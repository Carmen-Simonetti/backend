import { CartModel } from "../models/cart-model.js"; //Importo el modelo para interactuar con MongoDB; El manager NO usa Express.

class CartManager { //clase para la lógica de carritos
  async create() { //Método para crear un carrito nuevo.
    return await CartModel.create({ products: [] }); //Inserto un carrito vacío en la base de datos; Mongo genera automáticamente el _id.
  }
  //Obtengo carrito por ID ↓↓↓
  async getById(cartId) {  //Recibe el ID del carrito.
    return await CartModel.findById(cartId).populate("products.product"); //populate reemplaza el ObjectId del producto por el producto completo (nombre, precio, etc): Mongoose lee el carrito, ve products.product, encuentra ObjetId, busca ese ID en colección products, lo reemplaza x el doc completo con nombr precio etc
  }
  //Agrego producto al carrito ↓↓↓
  async addProduct(cartId, productId) { //Recibo el ID del carrito y el ID del producto
    const cart = await CartModel.findById(cartId); //Busco el carrito en la base.
    if (!cart) return null;  //Si no existe, devuelvo null (el controller decide la respuesta HTTP).

    const productIndex = cart.products.findIndex(  //findIndex busca la posición del producto en el array.
      p => p.product.toString() === productId //Busco si el producto ya está en el carrito y convierto ObjectId a string para comparar xq antes de eso p.product es un ObjectId, no string.
    );

    if (productIndex !== -1) { //Si el producto existe
      cart.products[productIndex].quantity++; //Aumento la cantidad.
    } else {
      cart.products.push({
        product: productId,
        quantity: 1 //y sino grego el producto al carrito con cantidad 1. 
      });
    }

    return await cart.save(); //Guardo los cambios en MongoDB.
  }
}

export const cartManager = new CartManager(); //Exporto una instancia lista para usar.
