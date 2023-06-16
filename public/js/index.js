const socket = io();

    // Manejar el clic en el botón de eliminar
    document.addEventListener('click', function(event) {
      if (event.target.matches('.delete-btn')) {
        const productId = event.target.getAttribute('data-id');
        deleteProduct(productId);
      }
    });

    // Función para eliminar un producto
    function deleteProduct(productId) {
      // Realizar una solicitud HTTP al servidor para eliminar el producto
      fetch(`/products/${productId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            console.log('Producto eliminado con éxito');
          } else {
            console.error('Error al eliminar el producto');
          }
        })
        .catch(error => {
          console.error('Error en la solicitud de eliminación del producto:', error);
        });
    }
