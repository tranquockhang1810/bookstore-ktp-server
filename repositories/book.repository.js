const { Op, literal } = require('sequelize');
const Book = require('../models/book.model');
const Category = require('../models/category.model');

class BookRepository {
  static async getListBooks(options = {}) {
    const {
      limit = 10,
      page = 1,
      where = {},
      sortBy = 'createdAt',
      sortDirection = 'DESC',
    } = options;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Lọc theo status
    if (where.status !== undefined) {
      whereClause.status = where.status;
    }

    // Tìm kiếm theo tên sách hoặc tên tác giả
    if (where.search) {
      const searchValue = `%${where.search}%`;

      whereClause[Op.and] = [
        literal(`unaccent("Book"."name") ILIKE unaccent('${searchValue}') OR unaccent("Book"."author") ILIKE unaccent('${searchValue}')`)
      ];
    }

    // Lọc theo nhiều category
    if (where.categoryIds && Array.isArray(where.categoryIds)) {
      whereClause.categoryId = {
        [Op.in]: where.categoryIds,
      };
    }

    // Lọc theo khoảng giá
    if (where.fromPrice !== undefined || where.toPrice !== undefined) {
      whereClause.price = {};
      if (where.fromPrice !== undefined) {
        whereClause.price[Op.gte] = where.fromPrice;
      }
      if (where.toPrice !== undefined) {
        whereClause.price[Op.lte] = where.toPrice;
      }
    }

    const { count, rows } = await Book.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [[sortBy, sortDirection.toUpperCase()]],
    });

    return {
      total: count,
      data: rows,
    };
  }

  static async getBookById(id) {
    return await Book.findByPk(id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });
  }

  static async createBook(data) {
    const created = await Book.create(data);

    // Lấy lại book kèm thông tin category
    const bookWithCategory = await Book.findByPk(created.id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return bookWithCategory;
  }

  static async updateBook(id, data) {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.update(data);

    // Lấy lại book kèm thông tin category
    const bookWithCategory = await Book.findByPk(book.id, {
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return bookWithCategory;
  }

  static async deleteBook(id) {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.destroy();
    return true;
  }
}

module.exports = BookRepository;
