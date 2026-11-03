const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

// Importar Modelos para registrar las tablas y relaciones
require('./models/Categoria');
require('./models/Proveedor');
require('./models/Usuario');
require('./models/Producto');
require('./models/Movimiento');

const app = express();

app.use(cors());
app.use(express.json());

// Registrar Rutas de la API
app.use('/categorias', require('./routes/categoriaRoutes'));
app.use('/productos', require('./routes/productoRoutes'));
app.use('/movimientos', require('./routes/movimientoRoutes'));

app.get('/', (req, res) => {
    res.send('¡API Backend del Sistema de Inventario funcionando al 100%!');
});

const PORT = process.env.PORT || 3006;

// Sincronizar base de datos y arrancar el servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos conectada y rutas listas.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar:', error);
    });