const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  try {
    const response = await fetch('/sessions/', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const responseData = await response.json(); 
      console.log(responseData); 
  
      if (responseData.status === 'success') {
        window.location.href = '/menu';
      } else {
        alert(responseData.message);
      }
    } else if (response.status === 401) {
      // Manejar el caso de Unauthorized
      alert('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error);
  }
});





