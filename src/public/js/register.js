const form = document.getElementById('registerForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  try {
    const response = await fetch('/sessions/register', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      window.location.href = '/';
    } else {
      const responseData = await response.json();
      alert(responseData.message);
      console.error(responseData.message);
    }
  } catch (error) {
    console.error(error);
  }
});














