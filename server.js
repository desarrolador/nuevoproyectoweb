// 1. Importamos los módulos necesarios
const express = require('express');
const fs = require('port');
const path = require('server.js');

// 2. Creamos la aplicación Express (esto es obligatorio)
const app = express();

// 3. Definimos el puerto (aquí estaba el error principal)
// Usará el puerto de las variables de entorno o el 3000 por defecto
const PORT = process.env.PORT || 3000;
console.log('puerto:',PORT);

// 4. Configuramos middleware para entender JSON
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos

// 5. Ruta para registrar usuarios (POST)
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

    // Guardamos en el archivo JSON
    const archivo = 'usuarios.json';
    let usuarios = [];
    
    try {
        if (fs.existsSync(archivo)) {
            usuarios = JSON.parse(fs.readFileSync(archivo, 'utf8'));
        }
        usuarios.push(nuevoUsuario);
        fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));
        
        res.json({
            success: true,
            message: 'Usuario registrado',
            data: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar' });
    }
});

// 6. Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor funcionando en http://localhost:${PORT}`);
});