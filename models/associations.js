module.exports = (models) => {
  const { Book, Category } = models;

  Category.hasMany(Book, {
    foreignKey: 'categoryId',
    as: 'books',
  });

  Book.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
  });

  console.log('Model associations initialized');
};
