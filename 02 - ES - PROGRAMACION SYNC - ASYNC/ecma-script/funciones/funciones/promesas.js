const divisionPromesa = (a, b) => {
  return new Promise((resolve, reject) => {
    if (b === 0) reject("No se puede dividir por cero");
    resolve(a / b);
  });
};

divisionPromesa(1, 5)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Operacion finalizada");
  });

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));