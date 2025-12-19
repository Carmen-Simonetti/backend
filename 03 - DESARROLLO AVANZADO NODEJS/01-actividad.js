

/*----------------------------------
ACTIVIDAD EN CLASE
Proyecto de node

✔ Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20. Indicar por consola la finalización de esta operación con un mensaje.
✔ Mediante el uso de Promesas, crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.

Nota: Considerar que esta operación debe realizarse de forma asíncrona.--------------------------------------- */


const obj = {};

/*
{
    1: 2, 
    2: 500, 
    ...20:  654,
}
*/

for (let i = 0; i <= 10000; i++) {
    const numero = Math.floor(Math.random() * 20) + 1;
    if(!obj[numero]) obj[numero] = 1
    else obj[numero]++    
}

console.log(obj);