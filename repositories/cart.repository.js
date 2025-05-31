const Cart = require('../models/cart.model');
const Book = require('../models/book.model');
const { Op } = require('sequelize');

class CartRepository {
  static async getByUser(userId) {
    return await Cart.findAll({
      where: { userId },
      include: [{
        model: Book,
        as: 'book',
        attributes: ['id', 'name', 'price', 'images', 'author'],
      }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async getByUserAndBook(userId, bookId) {
    return await Cart.findOne({
      where: { userId, bookId },
      include: [{
        model: Book,
        as: 'book',
        attributes: ['id', 'name', 'price', 'images', 'author'],
      }],
    });
  }

  static async addOrUpdate(userId, bookId, quantity) {
    const book = await Book.findByPk(bookId);
    if (!book) throw new Error('Book not found');

    const existingItem = await CartRepository.getByUserAndBook(userId, bookId);
    const newTotal = existingItem ? existingItem.quantity + quantity : quantity;

    if (newTotal > book.totalAmount) {
      throw new Error(`Cannot add more than ${book.totalAmount} items (currently in cart: ${existingItem?.quantity || 0})`);
    }

    if (existingItem) {
      existingItem.quantity = newTotal;
      return await existingItem.save();
    }

    return await Cart.create({ userId, bookId, quantity }, {
      include: [{
        model: Book,
        as: 'book',
        attributes: ['id', 'name', 'price', 'images', 'author'],
      }],
    });
  }


  static async updateQuantity(id, quantity) {
    const item = await Cart.findByPk(id, {
      include: [{
        model: Book,
        as: 'book',
        attributes: ['id', 'name', 'price', 'images', 'author'],
      }],
    });
    if (!item) return null;
    item.quantity = quantity;
    return await item.save();
  }

  static async delete(id) {
    return await Cart.destroy({ where: { id } });
  }

  static async deleteMany(ids) {
    return await Cart.destroy({ where: { id: { [Op.in]: ids } } });
  }
}

module.exports = CartRepository;
