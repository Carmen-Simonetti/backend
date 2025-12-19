//inicializar proyecto de node: npm init -y
//instalar bcrypt: npm i bcrypt

const fs = require("node:fs");
const bcrypt = require("bcrypt");

class UserManager {
  constructor(path) { //esta clase recibe por constructor el path o sea el director en donde queremos que genere el archivo.
    this.path = path;
  }

// tenemos 3 MÉTODOS: getUsers, register y login

  getUsers = async () => {
    try {
      if (fs.existsSync(this.path)) { //verifico si el archivo existe usando el método 'existsSync' y le paso el parámetro this.path pasandole el directorio (ruta del archivo q sale del constructor UserManager); si el archivo existe lee lo que está en users.json (abajo está la lectura)
        const users = await fs.promises.readFile(this.path, "utf-8"); //formato json; leo el archivo con el módulo fs. uso el método readFile para la lectura del archivo (users.json) leo el archivo que está con esa ubicacion (this.path con la codificacion 'utf-8')
        return JSON.parse(users); //paso el array que recibí con comillas de users.json [{"email": "---"}] en formado json a formato javaScript para después poder pushearlo
      }
      return []; //si el archivo no existe retorna un error, un array vacío para después poder guardar un usuario con el método de abajo register porque al pushear en register cuando guardo el usuario necesito tener el array x eso retorna un array vacío
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (obj) => {
    try {
      const users = await this.getUsers(); //traemos el array de usuarios con el método getUsers; await porque es un método asyncrono
      //formato js
      const user = { //genero el objeto del usuario
        ...obj,  //con los 3 puntitos (operador spread) copio todas las propiedades del objeto dentro del nuevo objeto user.
      };
      user.password = bcrypt.hashSync(user.password, 10); //el hashSync hashéa la password 
      users.push(user); //modifico array
      await fs.promises.writeFile(this.path, JSON.stringify(users)); //con el método writeFile sobreescribo el archivo para cambiarlo y lo paso a formato JSON
      return user; //retorno el usuario registrado
    } catch (error) {
      throw new Error(error);
    }
  };

  login = async (email, password) => {
    const users = await this.getUsers(); //traifo el array de usuarios
    const user = users.find((u) => u.email === email); //con el metodo find busco en usuarios un usuario q tenga el mismo mail q le es estoy pasando por mail como parámetro 
    if (!user) throw new Error("Invalid credentials"); //si no lo encuentra el proceso finaliza
    const isValidPass = bcrypt.compareSync(password, user.password); // paso el script plano y el script incraptado; le llega la password por parámetro y como segundo parámetro la password hasheada; el método compareSync hace la comparacion entre password plana q viene del login con lo que está guardado q viene del password hasheado; compareSync mw retorna true o false
    if (!isValidPass) throw new Error("Invalid credentials"); 
    return "Login OK";
  };
}

const userManager = new UserManager("./users.json"); //acá genero la instancia; la instancia (userManager) no puede tener el mismo nombre q la clase (UserManager); la generacion de la instancia espera el path osea el nombre donde yo quiero q se guarde el archivo

const test = async () => { //funcion q llama a los sig metodos p/ probar
  await userManager.register({ email: "juan@mail.com", password: "1234" }); //el objeto que paso con register; acá llamo a register, le paso el obj dsp p/ ver el res uso log 
  await userManager.register({ email: "mariano@mail.com", password: "12345" });
  console.log(await userManager.getUsers());
  console.log(await userManager.login("juan@mail.com", "1234"));
};

test(); //llamo a la funcion 

