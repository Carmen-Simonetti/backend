import mongoose from "mongoose"; //importo mongoose (librería para definir esquemas, crear modelos, conectarme a MongoDB)

const cartSchema = new mongoose.Schema({ //creo esquema que define la forma que tendrán los documentos dentro de la colección.
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, //El tipo de dato es ObjectId (lo usa MongoDB)
        ref: "products", //ref indica a qué colección apunta ese ObjectId, esto permite usar populate() para traer el producto completo. ref: "products" le dice a Mongoose: “Este ID pertenece a la colección products
        required: true //el carrito no puede tener un producto vacío
      },
      quantity: { //cantidad de ese producto en el carrito
        type: Number,
        default: 1
      }
    }
  ]
});

export const CartModel = mongoose.model("carts", cartSchema); //Creo el modelo Cart; "carts" --> nombre de la colección en Mongo; Este modelo es el que se usa para hablar con la base de datos.
