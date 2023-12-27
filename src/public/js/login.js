const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/session/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 200) {
        window.location.replace("/products");
        throw new Error("Ruta no encontrada en el servidor");
      } else {
        // Aquí manejas el caso de error
        return result.json(); 
      }
    })
    .then((errorBody) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario No encontrado!",
        footer: '<a href="/register">Registrese aquí</a>',
      });
    })
    .catch((error) => console.error(error));
});
