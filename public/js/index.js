const socket = io();

socket.emit('message', 'Hola mundo');

document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    
    
  
    if (addProductForm) {
      addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const formData = new FormData(addProductForm);
        const productData = Object.fromEntries(formData.entries());
  
        fetch('/Api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productData)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al agregar el producto');
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      });
    }


const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    const productId = event.target.getAttribute('data-id');

    fetch(`/Api/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error al eliminar el producto');
        }
      })
      .then(data => {
        // Manejar la respuesta del servidor
        console.log(data);
      })
      .catch(error => {
        // Manejar errores de la petición
        console.error(error);
      });
  });
});


});




  
    

  
  
  
  
  
  
  