const form = document.getElementById('logoutForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/sessions/logout', {
      method: 'POST', // O usa el método que estés utilizando en tu servidor para el logout
    });

    if (response.status === 200) {
      // Redirige al usuario a la página de inicio de sesión u otra página apropiada
      window.location.href = '/'; // Cambia la URL según tu configuración
    } else {
      const responseData = await response.json();
      alert(responseData.message);
      console.error(responseData.message);
    }
  } catch (error) {
    console.error(error);
  }
});
