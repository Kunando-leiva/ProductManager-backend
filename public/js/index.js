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

chatBox.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (chatBox.value.trim().length > 0) {
      socket.emit('message', { user, message: chatBox.value });
      chatBox.value = '';
    }
  }
});

socket.on('messageLogs', (data) => {
  let logs = document.getElementById('messageLogs');
  let messages = '';
  data.forEach((message) => {
    messages = messages + `<strong>${message.user}</strong>:  ${message.message}</br>`;
  });
  logs.innerHTML = messages;
});

socket.on('messageConected', (data) => {
  let logs = document.getElementById('messageLogs');
  logs.innerHTML += `<strong>${data}</strong></br>`;
});

// Escuchar el evento 'nuevoProducto'
socket.on('nuevoProducto', (producto) => {
    console.log('Datos del producto:', producto);
  const productosContainer = document.getElementById('productosContainer');

  // Crear el nuevo elemento del producto
  const card = document.createElement('div');
  card.className = 'card';
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  const title = document.createElement('h2');
  title.className = 'card-title';
  title.textContent = producto.title;
  const description = document.createElement('p');
  description.className = 'card-text';
  description.textContent = producto.description;
  const price = document.createElement('p');
  price.className = 'card-text';
  price.textContent = `$${producto.price}`;

  // Agregar los elementos al contenedor de productos
  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(price);
  card.appendChild(cardBody);
  productosContainer.appendChild(card);
});

// Escuchar el evento 'productoEliminado'
socket.on('productoEliminado', (id) => {
  const productosContainer = document.getElementById('productosContainer');

  // Buscar el elemento del producto por su ID y eliminarlo
  const productoElement = document.getElementById(`producto-${id}`);
  if (productoElement) {
    productoElement.remove();
  }
});

// Escuchar el evento 'productoActualizado'
socket.on('productoActualizado', (producto) => {
  const productosContainer = document.getElementById('productosContainer');

  // Buscar el elemento del producto por su ID y actualizar sus datos
  const productoElement = document.getElementById(`producto-${producto.id}`);
  if (productoElement) {
    productoElement.querySelector('.card-title').textContent = producto.title;
    productoElement.querySelector('.card-text.description').textContent = producto.description;
    productoElement.querySelector('.card-text.price').textContent = `$${producto.price}`;
  }
});

  
  
  
  
  
  