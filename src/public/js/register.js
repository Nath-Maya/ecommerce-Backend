const form = document.getElementById("registerForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));

  fetch("/session/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => {
      if (result.status === 404) {
        throw new Error("Ruta no encontrada en el servidor");
      }
      return result.json();
    })
    .then((json) => {
      console.log(json);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario registrado",
        showConfirmButton: true,
        timer: 2500,
      });
    })
    .catch((error) => console.error(error));
});
