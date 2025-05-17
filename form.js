 document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");

    // Mostrar datos guardados si existen al cargar la página
    const datosGuardados = localStorage.getItem("usuario");
    if (datosGuardados) {
        const usuario = JSON.parse(datosGuardados);
        resultado.innerHTML = `
            <h3>Datos registrados:</h3>
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Red social:</strong> ${usuario.redSocial}</p>
        `;
    }

    // Evento para guardar y mostrar los datos al enviar el formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const redSocial = document.getElementById("redSocial").value;

        // Guardar en localStorage
        const datosUsuario = { nombre, email, redSocial };
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));

        // Mostrar en pantalla
        resultado.innerHTML = `
            <h3>Datos registrados:</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Red social:</strong> ${redSocial}</p>
        `;
    });
});