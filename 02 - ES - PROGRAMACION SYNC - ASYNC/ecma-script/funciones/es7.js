/* -------------------------- operador exponencial -------------------------- */

//ES6
// console.log(Math.pow(2, 3))

//ES7
// console.log(2 ** 3)

/* -------------------------------- includes -------------------------------- */

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(numbers.includes(15));  // false

/* ------------------------------------ - ----------------------------------- */

const users = [
    { name: 'Juan', age: 23 },
    { name: 'Ana', age: 25 },
    { name: 'Pedro', age: 31 }
]

const exists = users.some((user)=>user.age > 30)

if(exists){
    console.log('Hay al menos un usuario mayor de 30 años');
}

console.log(users.find((user)=>user.age > 30)); // { name: 'Pedro', age: 31 }