      document.getElementById('userForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                redsocial: document.getElementById('redsocial').value
            };

            try {
                const response = await fetch('/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    document.getElementById('resultado').innerHTML = `
                        <div class="success">
                            <h3>✅ ${result.message}</h3>
                            <p><strong>Nombre:</strong> ${result.data.nombre}</p>
                            <p><strong>Email:</strong> ${result.data.email}</p>
                            <p><strong>Fecha:</strong> ${new Date(result.data.fecha).toLocaleString()}</p>
                        </div>
                    `;
                    document.getElementById('userForm').reset();
                } else {
                    throw new Error(result.error || 'Error desconocido');
                }
            } catch (error) {
                document.getElementById('resultado').innerHTML = `
                    <div class="error">
                        <p>❌ Error: ${error.message}</p>
                    </div>
                `;
            }
        });