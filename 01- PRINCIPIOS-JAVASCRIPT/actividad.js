const mostrarLista1 = (array) => {
  if (!Array.isArray(array)) return "No es un array";
  if (!array.length) return "Array vacío";
  const items = [];
  for (const item of array) {
    items.push(item);
  }
  return { longitud: array.length, items };
};

// console.log(mostrarLista1([1, 2, 3, 5]));

const mostrarLista2 = (array) => {
  if (!Array.isArray(array)) return "No es un array";
  if (!array.length) return "Array vacío";
  return { longitud: array.length, items: array.map((item) => item) };
};

console.log(mostrarLista2(['Juan', 'Guillermo', 'Martin']));