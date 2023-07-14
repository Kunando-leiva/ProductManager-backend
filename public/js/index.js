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


//actualizacion de mensajes en tiempo real
socket.on('messageLogs', (data) => {
  let logs = document.getElementById('messageLogs');
  let messages = '';
  data.forEach((message) => {
    messages = messages + `<strong>${message.user}</strong>:  ${message.message}</br>`;
  });
  logs.innerHTML = messages;
});


//mensaje de usuario conectado
socket.on('messageConected', (data) => {
  let logs = document.getElementById('messageLogs');
  logs.innerHTML += `<strong>${data}</strong></br>`;
});




// Escuchar el evento 'productos' y actualizar la lista de productos en tiempo real
socket.on('productos', (productos) => {
  updateProductosList(productos);
});

// Función para actualizar la lista de productos
function updateProductosList(productos) {
  const productosList = document.getElementById('productos-list');
  productosList.innerHTML = '';
  
  productos.forEach((producto) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <h2>${producto.title}</h2>
      <p>${producto.description}</p>
      <p>Precio: $${producto.price}</p>
      <button class="delete-btn" data-id="${producto.id}">Eliminar</button>
      <button class="edit-btn" data-id="${producto.id}">Editar</button>
    `;
    
    productosList.appendChild(listItem);
  });
}

// Manejar el evento de click en el botón 'Eliminar'
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const productId = event.target.getAttribute('data-id');
    socket.emit('delete-producto', productId);
  }
});

// Manejar el evento de click en el botón 'Editar'
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const productId = event.target.getAttribute('data-id');
    // Lógica para editar el producto
  }
});










