const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categoria = require('./Categoria');

const Producto = sequelize.define('Producto', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  precio: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'productos', timestamps: true });

// Relación: Una categoría tiene muchos productos, un producto pertenece a una categoría
Categoria.hasMany(Producto, { foreignKey: 'categoria_id' });
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id' });

module.exports = Producto;