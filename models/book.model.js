const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING },
  status: { type: DataTypes.BOOLEAN, defaultValue: true },
  description: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
  price: { type: DataTypes.INTEGER },
  categoryId: {
    type: DataTypes.UUID,
    references: {
      model: 'categories',
      key: 'id',
    },
    allowNull: false,
  },
  images: { type: DataTypes.ARRAY(DataTypes.STRING) },
  totalAmount: { type: DataTypes.INTEGER, defaultValue: 0 },
  soldAmount: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: 'books',
  timestamps: true,
});

module.exports = Book;