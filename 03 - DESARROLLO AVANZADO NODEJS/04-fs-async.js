const fs = require("node:fs");
const crypto = require("node:crypto");

class UserManager {
  constructor(path) {
    this.path = path;
  }

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const users = await fs.promises.readFile(this.path, "utf-8"); //array de usuarios
        return JSON.parse(users);   //lo paso a formato js para poder manipularlo
      }
      return []; //dejo el array vacío
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (obj) => {
    try {
      const users = await this.getUsers();
      //formato js
      const user = {
        ...obj,
      };
      user.secret = crypto.randomBytes(128).toString();
      user.password = crypto
        .createHmac("sha256", user.secret)
        .update(user.password)
        .digest("hex");
      users.push(user);
      await fs.promises.writeFile(this.path, JSON.stringify(users)) //guardar en formato json para poder GUARDAR sobreescribir/modificar el archivo, le paso el arrray (users)
      return user; //retorno el usuario registrado
    } catch (error) {
        throw new Error(error);
    }
  };

    login = async(email, password) => {
      const users = await this.getUsers();
      const user = users.find((u) => u.email === email);
      if (!user) throw new Error("Invalid credentials");
      const newCrypto = crypto
        .createHmac("sha256", user.secret)  
        .update(password)   
        .digest("hex");
      if (user.password !== newCrypto) throw new Error("Invalid credentials");
      return "Login OK";
    };
}

const userManager = new UserManager("./users.json");

const test = async () => {
    await userManager.register({ email: "juan@mail.com", password: "1234" });
    await userManager.register({ email: "mariano@mail.com", password: "12345" });
    console.log(await userManager.getUsers());
}

test() // llamo a test para ejecutar la funcion 
