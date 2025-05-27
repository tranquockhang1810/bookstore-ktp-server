const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const Bill = sequelize.define('Bill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'cancelled'),
    defaultValue: 'pending',
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'COD'
  },
}, {
  tableName: 'bills',
  timestamps: true,
});

module.exports = Bill;
