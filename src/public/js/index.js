const socket = io();

let user;

const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

Swal.fire({
  title: 'Ingresa tu nombre',
  input: 'text',
  text: 'Ingresa tu nombre de usuario',
  icon: 'success',
  inputValidator: (value) => {
    return !value && 'Por favor ingresa tu nombre de usuario';
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  Swal.fire(`Bienvenido al chat ${user}`);
  socket.emit('message', { user, message: `se ha unido al chat` });
});

// creacion de mensajes en tiempo real
chatBox.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', { user, message: chatBox.value });
      chatBox.value = '';
    }
  }
});


// Actualizar lista:
function updateProducts(productos) {
	const ul = document.querySelector("ul");
	ul.innerHTML = "";

	productos.forEach(producto => {
		const li = document.createElement("li");
		li.textContent = producto.title;
		li.className = "real-time-item";
		ul.appendChild(li);
	});
};

// Recibir productos:
socket.on("productos", (productos) => {
	updateProducts(productos);
});





