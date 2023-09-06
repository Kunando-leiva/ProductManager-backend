function peticion(){
    fetch("http://localhost:8080/test").then(resul=>resul.json())
    .then(json=>console.response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}


