import { model, Schema } from "mongoose";

const PetSchema = new Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
});

export const PetModel = model("pets", PetSchema);