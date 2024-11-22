// Seleccionar el formulario
const form = document.getElementById('contact');

// Manejar el evento de envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío del formulario
    alert('Su formulario ha sido enviado exitosamente.');
    form.reset(); // Opcional: Reiniciar el formulario
});
