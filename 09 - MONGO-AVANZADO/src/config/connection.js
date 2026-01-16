import { connect } from "mongoose";

//const MONGO_URL = "mongodb://localhost:27017/coderhouse"; //sting de conexión 
const MONGO_URL = process.env.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await connect(MONGO_URL); //me conecto a la base de datos local
  } catch (error) {
    throw new Error(error);
  }
};