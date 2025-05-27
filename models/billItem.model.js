const { DataTypes } = require('sequelize');
const sequelize = require('../db/postgres');

const BillItem = sequelize.define('BillItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  billId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'bills',
      key: 'id',
    },
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
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'bill_items',
  timestamps: true,
});

module.exports = BillItem;
