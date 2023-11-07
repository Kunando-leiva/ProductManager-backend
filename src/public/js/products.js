document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.querySelector("form[name='productForm']");

    productForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Recopila los datos del formulario
      const formData = new FormData(productForm);
      const obj = {};
      formData.forEach((value, key) => (obj[key] = value));

      try {
        const response = await fetch("/productos", {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          alert("Producto creado exitosamente");
          window.location.reload(); // Recarga la página para reflejar los cambios
        } else {
          const data = await response.json();
          alert("Error al crear el producto: " + data.message);
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    });
  });
  
