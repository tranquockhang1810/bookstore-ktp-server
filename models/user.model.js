const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('admin', 'user') },
  phone: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
}, {
  tableName: 'users',
  timestamps: true, 
});

module.exports = User;
