import { Schema, model } from "mongoose"; //uso de clase Schema y método model

const ProductSchema = new Schema({ //creamos el esquema
  name: { type: String, required: true }, 
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, required: true },
});

export const ProductModel = model("products", ProductSchema); //exporto el modelo de producto que se crea con la llamada al método model. el método model recibe el nombre de la collection