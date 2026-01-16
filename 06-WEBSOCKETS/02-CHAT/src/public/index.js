const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "¡Bienvenido/a al chat!",
    input: "text",
    text: "Por favor, ingresa tu nombre de usuario:",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "¡Necesitas ingresar un nombre de usuario para continuar!";
      }
    },
  }).then((input) => {
    username = input.value;
    socket.emit("new-user", username);
  });
}

socket.on("new-user", (username) => {
  Toastify({
    text: `${username} inició sesión`,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    // close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});

const actions = document.getElementById("actions"); //selecciono actions
const btn = document.getElementById("send");
const output = document.getElementById("output");
const message = document.getElementById("message"); //selecciono el input mensaje

btn.addEventListener("click", () => { //cada vez q se hace click se envia el msj nuevo
  socket.emit("chat:message", { //envio este objeto al servidor con este evento
    username,  //envio username
    message: message.value, //y el msj + el valor del input
  });
  message.value = "";
});

socket.on("messages", (data) => {
  actions.innerHTML = ""; //"vacío" el contenido HTML que hay dentro del elemento actions (borro el aviso)
  const chat = data
    .map((msg) => { //mapeo los mensajes de data 
      return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`; //de cada mensaje retorno para mostrar el msj 
    })
    .join(" "); // para q no muestre los msjs uno al lado del otro 

  output.innerHTML = chat;
});

message.addEventListener("keypress", () => { //emito el evento chat:typing ENVÍO
  socket.emit("chat:typing", username); //para cuando está escribiendo el usuario
});

socket.on("chat:typing", (data) => {  //escucho de nuevo el evento chat:typing Y ACÁ LO VUELVO A RECIBIR 
  actions.innerHTML = `<p><em>${data} está escribiendo un mensaje...</em></p>`;
});