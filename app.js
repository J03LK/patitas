const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'patitas_al_rescate',
    password: '12345678',
    port: 5432,
});

// Ruta para manejar el envío del formulario
app.post('/formulario', async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;

    try {
        const query = `
            INSERT INTO voluntariado (nombre, correo, telefono, mensaje)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [nombre, correo, telefono, mensaje]);

        res.json({
            success: true,
            message: '¡Formulario enviado correctamente!',
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al enviar el formulario.',
            error: error.message
        });
    }
});

// Ruta de prueba
app.get('/test', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});