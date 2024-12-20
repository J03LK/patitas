document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const formData = {
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                telefono: document.getElementById('telefono').value,
                mensaje: document.getElementById('mensaje').value
            };

            // Cambiamos la URL para que apunte a nuestro servidor Node.js
            const response = await fetch('http://localhost:3000/formulario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('¡Formulario enviado con éxito!');
                form.reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el formulario. Por favor, intenta nuevamente.');
        }
    });
});