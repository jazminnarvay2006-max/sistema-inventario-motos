const Categoria = require('../models/Categoria');

// Listar categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear categoría
exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await Categoria.create(req.body);
        res.json(nuevaCategoria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};