function saludar(nombre) {
    return `Hola, ${nombre}`;
}

const saludar2 = (nombre) => {
    return `Hola, ${nombre}`;
}

const saludar3 = nombre => `Hola, ${nombre}`;

console.log(saludar3('Roberto'));

/* -------------------------------- callbacks ------------------------------- */

const array = [1, 2, 3, 4, 5];

const array2 = array.filter((n) => n > 2);

array.map(n => console.log(n));

console.log(array2);