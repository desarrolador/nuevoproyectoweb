 document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        redsocial: document.getElementById('redsocial').value
    };

    try {
        const response = await fetch('/registrar-usuario', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, eamil ,redsocial})
        });
        const data = await respuesta.json();
        alert(data.mensaje || data.error);


        if (response.ok) {
            document.getElementById('resultado').innerHTML = `
                <div class="alert success">
                    <h3>✅ ${result.message}</h3>
                    <p>Nombre: ${result.data.nombre}</p>
                    <p>Email: ${result.data.email}</p>
                </div>
            `;
            document.getElementById('formRegistro').reset();
        } else {
            throw new Error(result.error || 'Error en el registro');
        }
    } catch (error) {
        document.getElementById('resultado').innerHTML = `
            <div class="alert error">
                ❌ Error: ${error.message}
            </div>
        `;
    }
});