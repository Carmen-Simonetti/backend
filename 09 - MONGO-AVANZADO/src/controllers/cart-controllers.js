import { cartManager } from "../managers/cart-manager.js";  //El controller NO toca Mongo, delega al manager.

class CartControllers { //Clase que maneja req / res.
  create = async (req, res) => { //creo carrito
    const cart = await cartManager.create(); //Endpoint POST; Llamo al manager para crear el carrito.
    res.json(cart); //Devuelvo el carrito al cliente.
  };
  // Obtener carrito por ID ↓↓↓ 
  getById = async (req, res) => { //Obtengo el ID desde la URL.
    const { cid } = req.params; //Obtengo el ID desde la URL.
    const cart = await cartManager.getById(cid); //Pido el carrito al manager.
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" }); //Manejo error HTTP desde el controller.
    res.json(cart); //Devuelvo el carrito.
  };
   //  Agregar producto  ↓↓↓
  addProduct = async (req, res) => { //Extraigo ambos IDs.
    const { cid, pid } = req.params; //Extraigo ambos IDs.
    const cart = await cartManager.addProduct(cid, pid); //Delego la lógica al manager. El controller recibe la request y delega la lógica al manager
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json(cart);
  };
}

export const cartControllers = new CartControllers();
