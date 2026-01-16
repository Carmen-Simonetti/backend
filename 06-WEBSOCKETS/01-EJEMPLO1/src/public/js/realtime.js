const socket = io();

const form = document.getElementById("form");
const title = document.getElementById("title");
const price = document.getElementById("price");
const productsDiv = document.getElementById("products");

// recibir productos del servidor
socket.on("products", (products) => {
  let html = "";
  products.forEach(p => {
    html += `
      <p>
        ${p.title} - $${p.price}
        <button onclick="deleteProduct('${p.id}')">❌</button>
      </p>
    `;
  });
  productsDiv.innerHTML = html;
});

// enviar nuevo producto
form.addEventListener("submit", e => {
  e.preventDefault();

  const product = {
    title: title.value,
    price: price.value
  };

  socket.emit("new-product", product);
  form.reset();
});

// eliminar producto
function deleteProduct(id) {
  socket.emit("delete-product", id);
}
