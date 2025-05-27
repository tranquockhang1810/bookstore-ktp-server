const Bill = require('../models/bill.model');
const BillItem = require('../models/billItem.model');
const Book = require('../models/book.model');
const Cart = require('../models/cart.model');
const sequelize = require('../db/postgres');
const { Op } = require('sequelize');

class BillRepository {
  static async createBillFromCartItemIds(userId, cartItemIds, paymentMethod) {
    return await sequelize.transaction(async (t) => {
      const cartItems = await Cart.findAll({
        where: {
          id: { [Op.in]: cartItemIds },
          userId
        },
        include: [{ model: Book, as: 'book' }],
        transaction: t
      });

      if (!cartItems.length) throw new Error('No valid cart items found');

      const items = [];
      let totalPrice = 0;

      for (const item of cartItems) {
        if (!item.book) {
          throw new Error(`Book not found for cart item ${item.id}`);
        }

        if (item.book.totalAmount < item.quantity) {
          throw new Error(`Book "${item.book.name}" does not have enough stock`);
        }

        items.push({
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.book.price,
        });

        totalPrice += item.quantity * item.book.price;

        // Trừ tồn kho sách
        item.book.totalAmount -= item.quantity;
        item.book.soldAmount += item.quantity;
        await item.book.save({ transaction: t });
      }

      const bill = await Bill.create({
        userId,
        totalPrice,
        paymentMethod
      }, { transaction: t });

      for (const item of items) {
        await BillItem.create({
          ...item,
          billId: bill.id
        }, { transaction: t });
      }

      const bookIds = items.map(i => i.bookId);
      await Cart.destroy({
        where: {
          userId,
          bookId: { [Op.in]: bookIds }
        },
        transaction: t
      });

      return bill;
    });
  }

  static async getByUser(userId) {
    return await Bill.findAll({
      where: { userId },
      include: [{ model: BillItem, as: 'items', include: [{ model: Book, as: 'book', attributes: ['id', 'name', 'price', 'images', 'author'] }] }],
      order: [['createdAt', 'DESC']],
    });
  }

  static async getAll({ limit = 10, page = 1, status, fromDate, toDate }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (status) {
      where.status = status;
    }

    if (fromDate && toDate) {
      const start = new Date(fromDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);

      where.createdAt = { [Op.between]: [start, end] };
    }

    const { count, rows } = await Bill.findAndCountAll({
      where,
      include: [
        {
          model: BillItem,
          as: 'items',
          include: [
            {
              model: Book,
              as: 'book',
              attributes: ['id', 'name', 'price', 'images', 'author'],
            }
          ]
        }
      ],
      distinct: true,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      total: count,
      data: rows
    };
  }

  static async updateStatus(billId, status) {
    const bill = await Bill.findByPk(billId);
    if (!bill) return null;
    bill.status = status;
    return await bill.save();
  }
}

module.exports = BillRepository;
