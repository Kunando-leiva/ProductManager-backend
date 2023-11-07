// // Esta función recibe el ID del usuario (cid) y el ID del producto (_id) como argumentos.
// function addProductToCart(cid, _id) {
//     console.log("addproduc", cid)
//     // Define el objeto con los datos que quieres enviar al servidor.
//     const data = {
//       quantity: 1, // Puedes ajustar la cantidad si es necesario
//     };

import { error } from "winston";

  
//     // Realiza una solicitud POST al servidor para agregar el producto al carrito.
//     fetch(`/Cart/${cid}/producto/${_id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then(response => {
//         if (response.status === 200) {
//           // Producto agregado al carrito con éxito, puedes realizar alguna acción en la interfaz de usuario si es necesario.
//           alert('Producto agregado al carrito con éxito');
//         } else {
//           return response.json();
//         }
//       })
//       .then(data => {
//         if (data) {
//           alert(data.message); // Muestra un mensaje de error si la adición no fue exitosa.
//         }
//       })
//       .catch(error => {
//         console.error('Error al agregar el producto al carrito:', error);
//       });
//   }
  
//   // Agrega un manejador de eventos en el botón de "Agregar al Carrito" en la vista.
//   document.querySelectorAll('.add-to-cart-button').forEach(button => {
//     button.addEventListener('click', event => {
//       const userId = button.getAttribute('data-user-id');
//       const productId = button.getAttribute('data-product-id');
//       addProductToCart(userId, productId);
//     });
//   });
  
const productForms = document.querySelectorAll('.product-form');

productForms.forEach(productForm => {
    productForm.addEventListener('submit', e => {
        e.preventDefault();
        const cart = productForm.getAttribute('cart');
        const product = productForm.getAttribute('product');
        
        fetch(`/cart/${cart}/product/${product}`, {
            method: 'POST',
        })
        .then(res => {
            if (res.status === 200) {
                alert('Producto agregado al carrito exitosamente');
            } else {
                alert('Error al agregar el producto al carrito');
            }
        })
        .catch(error => {
            console.error(`Catch error: ${error}`);
        });
    });
});










// function addProductToCart(_id, quantity) {
//     // Realizar una solicitud AJAX para agregar el producto al carrito
//     fetch(`/carrito/${cid}/producto/${_id}`, {
//         method: 'POST', // Utiliza el método POST o el que corresponda en tu servidor
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ quantity }),
//     })
//     .then(response => {
//         if (response.status === 200) {
//             // Producto agregado al carrito con éxito, puedes realizar alguna acción en la interfaz de usuario si es necesario
//             alert('Producto agregado al carrito con éxito');
//         } else {
//             return response.json();
//         }
//     })
//     .then(data => {
//         if (data) {
//             alert(data.message); // Muestra un mensaje de error si la adición no fue exitosa
//         }
//     })
//     .catch(error => {
//         console.error('Error al agregar el producto al carrito:', error);
//     });
// }