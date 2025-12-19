/* ----------------------------- spread operator ---------------------------- */
const array = [1, 2, 3, 4, 5];

// console.log(Math.min(...array));

const array2 = [...array, 6, 7, 8, 9, 10];

// console.log(array2);

const user = {
    name: "Luis",
    age: 30,
}

const usermodified = {
    ...user,
    email: "luis@mail.com"
}

// console.log(usermodified);

/* ------------------------------ rest operator ----------------------------- */

const functionTest = (a, b, ...otros) => {
    console.log(a);
    console.log(b);
    console.log(otros);
}

functionTest('hola', true, 'coder', 45, null, undefined, { id: 1 });


/* ------------------------------------ - ----------------------------------- */

const fn = (a, b = 'valor2') => {
    console.log(a, b);
}

fn('valor1', 'valor3')
