const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

// Listar productos con su categoría
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{ model: Categoria, attributes: ['nombre'] }]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear producto (exigiendo categoría_id)
exports.crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria_id } = req.body;
        const nuevoProducto = await Producto.create({
            nombre,
            descripcion,
            precio,
            stock: stock || 0,
            categoria_id
        });
        res.json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};