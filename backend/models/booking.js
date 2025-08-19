// backend/models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Service = require('./service');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookingDate: { type: DataTypes.DATE, allowNull: false },
  status: { 
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'), 
    defaultValue: 'pending' 
  }
});

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Service, { foreignKey: 'serviceId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Service.hasMany(Booking, { foreignKey: 'serviceId' });

module.exports = Booking;
