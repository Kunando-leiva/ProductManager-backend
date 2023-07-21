const socket = io();


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
