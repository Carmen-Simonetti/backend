import fs from "fs";
//retorno el array que va a controllers
export const createUsers = () => {
  try {
    const data = fs.readFileSync("./src/data/Users.json", "utf-8");
    const users = JSON.parse(data);
    return users;
  } catch (error) {
    throw new Error(`Error creando usuarios: ${error.message}`);
  }
};