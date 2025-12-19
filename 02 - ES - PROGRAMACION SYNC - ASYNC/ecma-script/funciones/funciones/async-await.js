const divisionPromesa = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) reject("No se puede dividir por cero");
    resolve(a / b);
  });
};

const division = async(a, b) => {
    try {
        console.log(await divisionPromesa(a, b));
    } catch (error) {
        console.log(error);
    }
}

division(1, 3)

/* ------------------------------------ - ----------------------------------- */

const test = async() => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

test();