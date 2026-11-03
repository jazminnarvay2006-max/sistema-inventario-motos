const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  rol: { type: DataTypes.STRING, defaultValue: 'Almacenero' },
  estado: { type: DataTypes.STRING, defaultValue: 'Active' }
}, { tableName: 'usuarios', timestamps: true });

module.exports = Usuario;