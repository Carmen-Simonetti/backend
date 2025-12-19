function prueba () {
    return "Hola Mundo";
}

const prueba2 = (nombre) => {
    return `hola ${nombre}`;
}

const prueba3 = nombre => `hola ${nombre}`;

/* ------------------------------------ - ----------------------------------- */

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;

const operacion = (a, b, cb) => {
    console.log(cb(a, b))
            //suma(1, 14)
}

operacion(1, 14, suma)

/* ------------------------------------ - ----------------------------------- */

setTimeout(()=>{
    console.log('Hola JavaScript Async');
}, 3000)

/* ------------------------------------ - ----------------------------------- */

const array = [1, 2, 3, 4, 5];

array.find(n => n === 4);