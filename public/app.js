document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formRegistro').addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const redsocial = document.getElementById('redsocial').value;

        try {
            const response = await fetch('/registrar-usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, email, redsocial })
            });
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                throw new Error('No se pudo interpretar la respuesta del servidor.');
            }
            if (!response.ok) {
                throw new Error(data.error || 'Error en el registro');
            }
            document.getElementById('resultado').innerHTML = `
                <div class="alert success">
                    <h3>✅ ${data.message}</h3>
                    <p>Nombre: ${data.data?.nombre || ''}</p>
                    <p>Email: ${data.data?.email || ''}</p>
                </div>
            `;
            document.getElementById('formRegistro').reset();
        } catch (error) {
            document.getElementById('resultado').innerHTML = `
                <div class="alert error">
                    ❌ Error: ${error.message}
                </div>
            `;
        }
    });
});