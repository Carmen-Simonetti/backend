/* ------------------------------- Primitivos ------------------------------- */
let cadena = 'Hola soy un string'

let numero = 1000

let booleano = false // true

let nulo = null

let indefinido = undefined

console.log(typeof numero);

/* --------------------------------- Objetos -------------------------------- */

//Date
console.log(new Date());

//Regexp
console.log('Atención'.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));

//Error
throw new Error('¡Hay un error!');
//{ message: '¡Hay un error!' stack: 'Error: ¡Hay un error! ...' }