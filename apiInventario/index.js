const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sequelize = require('./config/db');
require('dotenv').config();

// Importar Modelos para que Sequelize los registre
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');

const app = express();

// --- 1. MIDDLEWARES GENERALES Y DE SEGURIDAD ---
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP, intente más tarde.'
});
app.use('/api/', limitador);

// --- 2. PARSEADOR DE JSON (DEBE IR ANTES DE LAS RUTAS) ---
app.use(express.json());

// --- 3. IMPORTAR RUTAS Y MIDDLEWARE DE AUTENTICACIÓN ---
const authRoutes = require('./routes/authRouter');
const autenticar = require('./middleware/authMiddleware');

// --- 4. REGISTRAR RUTAS DE AUTENTICACIÓN ---
app.use('/api/auth', authRoutes);

// --- RUTAS BÁSICAS DE PRUEBA ---
app.get('/', (req, res) => {
  res.send('¡API Backend funcionando exitosamente!');
});

// --- RUTAS CRUD PARA PRODUCTOS (Protegidas con JWT y Roles) ---
app.post('/productos', autenticar(['Administrador']), async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/productos', autenticar(['Administrador', 'Almacenero']), async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/productos/:id', autenticar(['Administrador']), async (req, res) => {
  try {
    await Producto.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/productos/:id', autenticar(['Administrador']), async (req, res) => {
  try {
    await Producto.destroy({
      where: { id: req.params.id }
    });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- SINCRONIZACIÓN Y ARRANQUE ---
const PORT = process.env.PORT || 3006;

sequelize.sync({ force: false })
  .then(() => {
    console.log('[apiInventario] Base de datos conectada y sincronizada.');
    app.listen(PORT, () => {
      console.log(`[apiInventario] Servidor activo y seguro en puerto ${PORT} (http://localhost:${PORT})`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos:', error);
  });