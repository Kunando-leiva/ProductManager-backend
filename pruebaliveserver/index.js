function peticion() {
    fetch("http://localhost:8080/test")
        .then(response => response.text())  // Cambia response.json() por response.text()
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

