/* ------------------------------
modulo nativo de nodejs nos va a servir para manipular archivos poder leer escribir eliminar, 
tiene métodos para usar de manera sincronica o asíncrona -------------------------------------------- */


/** los metodos que tienen la palabra sync al final son los sincronicos */
const fs = require('node:fs')

const path = './file.txt' //donde queremos que se guarde el archivo junto con la extension 


if(fs.existsSync(path)) {
    //console.log(fs.readFileSync(path,`utf-8` ))
    fs.appendFileSync(path, ',cómo están?') //para que le adicione algo más 
}
    else fs.writeFileSync(path, 'hola mundo')