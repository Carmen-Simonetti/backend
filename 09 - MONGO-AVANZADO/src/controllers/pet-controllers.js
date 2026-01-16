import { PetModel } from "../models/pet-model.js";

//creacion de animales ↓↓↓
export const petControllers = {
  createManyPets: async (req, res) => {
    const pets = [
      { name: "Lázaro", breed: "Dog" },
      { name: "Ozzy", breed: "Cat" },
      { name: "Sino", breed: "Cat" },
      { name: "Coco", breed: "Dog" }
    ];

    try {
      await PetModel.insertMany(pets);
      res.json({ message: "Mascotas agregadas" });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
