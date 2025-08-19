// backend/models/Service.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Service = sequelize.define('Service', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
});

Service.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
User.hasMany(Service, { foreignKey: 'userId' });

module.exports = Service;
