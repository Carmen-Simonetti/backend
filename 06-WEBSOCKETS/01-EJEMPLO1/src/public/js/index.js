const socket = io();
console.log("✅ index.js cargado correctamente");

socket.on('mensaje-server', (message)=>{
    console.log(message);
    
    socket.emit('mensaje-client', 'Gracias por el mensaje, servidor');
})


const form = document.getElementById('form');
const unputName = document.getElementById('name');
const unputPrice = document.getElementById('price');
const products = document.getElementById('products');


form.onsubmit = (e) => {
    e.preventDefault();
    const name = unputName.value;
    const price = unputPrice.value;
    socket.emit('new-product', {name, price});
}

socket.on('array-productos', (array)=>{
    let infoProducts = '';
    array.forEach(p =>{
        infoProducts += `${p.name} - $${p.price} <br/>`
    })
    products.innerHTML = infoProducts;
})