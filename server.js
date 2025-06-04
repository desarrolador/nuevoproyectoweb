// 1. Importamos los módulos necesarios
const express = require('express');
const path = require('path');
const fs = require('fs');

// 2. Creamos la aplicación Express (esto es obligatorio)
const app = express();

// 3. Definimos el puerto (aquí estaba el error principal)
// Usará el puerto de las variables de entorno o el 3000 por defecto
const PORT = process.env.PORT || 3000;
console.log('puerto:',PORT);

// 4. Configuramos middleware para entender JSON
app.use(express.json());
app.use(express.static('public'));

// Ruta POST para registrar usuarios
app.post('/registrar-usuario', (req, res) => {
    const { nombre, email, redsocial } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    const nuevoUsuario = {
        nombre,
        email,
        redsocial: redsocial || 'No especificada',
        fecha: new Date().toISOString()
    };

    const archivo = 'usuario.json';
    let datos = { usuarios: [] };

    try {
        if (fs.existsSync(archivo)) {
            try {
                const contenido = fs.readFileSync(archivo, 'utf8');
                datos = JSON.parse(contenido);
                if (!Array.isArray(datos.usuarios)) {
                    datos = { usuarios: [] };
                }
            } catch (err) {
                // Si hay error al leer o parsear, regenerar el archivo
                datos = { usuarios: [] };
            }
        }
        datos.usuarios.push(nuevoUsuario);
        fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));

        // Mostrar en consola el usuario registrado y la IP
        console.log('Usuario registrado:', nuevoUsuario);
        console.log('Registro desde:', req.ip);

        res.json({
            success: true,
            message: 'Usuario registrado',
            data: nuevoUsuario
        });
    } catch (error) {
        console.error('Error al guardar usuario:', error); // Log del error real
        res.status(500).json({ error: 'Error al guardar' });
    }
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error general:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor funcionando en http://localhost:${PORT}`);
});