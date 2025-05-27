module.exports = (models) => {
  const { Book, Category, Cart, Bill, BillItem } = models;

  Category.hasMany(Book, {
    foreignKey: 'categoryId',
    as: 'books',
  });

  Book.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  // Book - Cart
  Book.hasMany(Cart, { foreignKey: 'bookId' });
  Cart.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });

  Bill.hasMany(BillItem, { foreignKey: 'billId', as: 'items' });
  BillItem.belongsTo(Bill, { foreignKey: 'billId' });

  BillItem.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
  Book.hasMany(BillItem, { foreignKey: 'bookId' });

  console.log('Model associations initialized');
};
