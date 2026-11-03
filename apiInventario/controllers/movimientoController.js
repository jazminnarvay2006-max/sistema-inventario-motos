const Movimiento = require('../models/Movimiento');
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');
const sequelize = require('../config/db');

// Listar movimientos (Kardex)
exports.obtenerMovimientos = async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll({
            include: [
                { model: Producto, attributes: ['nombre'] },
                { model: Usuario, attributes: ['nombre', 'rol'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Registrar Movimiento con Transacción (Entrada / Salida)
exports.crearMovimiento = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { producto_id, usuario_id, tipo_movimiento, cantidad, observaciones } = req.body;

        // 1. Buscar el producto
        const producto = await Producto.findByPk(producto_id, { transaction: t });
        if (!producto) {
            await t.rollback();
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // 2. Calcular nuevo stock según el tipo de movimiento
        let nuevoStock = producto.stock;
        if (tipo_movimiento === 'Entrada') {
            nuevoStock += parseInt(cantidad);
        } else if (tipo_movimiento === 'Salida') {
            if (producto.stock < cantidad) {
                await t.rollback();
                return res.status(400).json({ error: 'Stock insuficiente para la salida' });
            }
            nuevoStock -= parseInt(cantidad);
        }

        // 3. Actualizar stock en la tabla Productos
        await producto.update({ stock: nuevoStock }, { transaction: t });

        // 4. Registrar el movimiento en el Kardex
        const movimiento = await Movimiento.create({
            producto_id,
            usuario_id,
            tipo_movimiento,
            cantidad,
            observaciones,
            fecha_hora: new Date()
        }, { transaction: t });

        // Confirmar transacción exitosa
        await t.commit();
        res.json({ mensaje: 'Movimiento registrado con éxito y stock actualizado', movimiento });

    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};