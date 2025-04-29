const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN, defaultValue: true },
  description: { type: DataTypes.STRING },
}, {
  tableName: 'categories',
  timestamps: true,
});

module.exports = Category;