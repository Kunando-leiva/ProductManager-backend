function deleteProduct(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        // Realizar una solicitud AJAX para eliminar el producto con el ID productId
        fetch(`/productos/${id}`, {
            method: 'DELETE', // Utiliza el método DELETE o el que corresponda en tu servidor
        })
        .then(response => {
            if (response.status === 200) {
                // Producto eliminado con éxito, puedes recargar la página o actualizar la lista de productos
                window.location.reload(); // Recarga la página para reflejar los cambios
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data) {
                alert(data.message); // Muestra un mensaje de error si la eliminación no fue exitosa
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
}