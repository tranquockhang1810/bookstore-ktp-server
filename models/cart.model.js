const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'carts',
  timestamps: true,
});

module.exports = Cart;
