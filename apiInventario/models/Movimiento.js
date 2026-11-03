const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Producto = require('./Producto');
const Usuario = require('./Usuario');

const Movimiento = sequelize.define('Movimiento', {
  tipo_movimiento: { type: DataTypes.STRING, allowNull: false }, // Entrada, Salida, Ajuste
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  fecha_hora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  observaciones: { type: DataTypes.TEXT }
}, { tableName: 'movimientos', timestamps: true });

Producto.hasMany(Movimiento, { foreignKey: 'producto_id' });
Movimiento.belongsTo(Producto, { foreignKey: 'producto_id' });

Usuario.hasMany(Movimiento, { foreignKey: 'usuario_id' });
Movimiento.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Movimiento;