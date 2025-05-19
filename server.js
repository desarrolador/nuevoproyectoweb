const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Sirve archivos estáticos

// Ruta para el formulario
app.get('/registrar-usuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar el formulario
app.post("/registrar-usuario", (req, res) =>{
    const { nombre, email, redsocial } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son requeridos' });
    }

    const usuario = {
        nombre,
        email,
        redsocial: redsocial || 'No especificada',
        fecha: new Date().toISOString()
    };

    // Guardar en JSON (ejemplo básico)
    const archivo = 'usuarios.json';
    let usuarios = fs.existsSync(archivo) ? JSON.parse(fs.readFileSync(archivo)) : [];
    usuarios.push(usuario);
    fs.writeFileSync(archivo, JSON.stringify(usuarios, null, 2));

    res.json({ 
        success: true,
        message: 'Registro exitoso',
        data: usuario
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});