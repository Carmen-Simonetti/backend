import { PetModel } from "../models/pet-model.js"; //modelo de Mongoose (representa la colección pets en MongoDB)

//creacion de animales ↓↓↓
export const petControllers = {
  createManyPets: async (req, res) => { //endpoint no recibe datos del cliente; crea mascotas “hardcodeadas” y sirve para cargar datos de prueba.
    const pets = [
      { name: "Lázaro", breed: "Dog" },
      { name: "Ozzy", breed: "Cat" },
      { name: "Sino", breed: "Cat" },
      { name: "Coco", breed: "Dog" }
    ];

    try {
      await PetModel.insertMany(pets); //inserto varios docs de una vez (pets) Mongo recibe mi array
      res.json({ message: "Mascotas agregadas" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
