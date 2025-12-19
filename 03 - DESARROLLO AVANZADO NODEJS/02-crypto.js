const crypto = require("node:crypto"); //importo librería crypto PARA GUARDAR INFORMACION EN LA MEMORIA DE NODE

class UserManager {
  constructor() {
    this.users = [];
  }

  getUsers = () => {
    return this.users;
  };

  register = (obj) => {
    const user = {
      ...obj,
    };
    user.secret = crypto.randomBytes(128).toString();
    user.password = crypto
      .createHmac("sha256", user.secret)
      .update(user.password)
      .digest("hex");
      //dfgdfgdfgdfg
    this.users.push(user);
    return user;
  };

  login = (email, password) => {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email);
    /*
    {
        email: 'juan@mail.com',
        password: 'sdjkahsd7832dbwid',
        secret: 'asdcvb'
    }
    */
    if (!user) throw new Error("Invalid credentials");
    const newCrypto = crypto  //encripto la contraseña que entra
      .createHmac("sha256", user.secret)    //'asdcvb' uso el valor secreto que se guardó cuando se registró el usuario
      .update(password)     //'1234' recibe el update de la password que me llega 
      .digest("hex");
      //dfgdfgdfgdfg
    if (user.password !== newCrypto) throw new Error("Invalid credentials");
    return "Login OK";
  };
}

const userManager = new UserManager();

userManager.register({ email: "juan@mail.com", password: "1234" });
userManager.register({ email: "mariano@mail.com", password: "12345" });
// console.log(userManager.getUsers());
console.log(userManager.login('juan@mail.com', '1234'));
