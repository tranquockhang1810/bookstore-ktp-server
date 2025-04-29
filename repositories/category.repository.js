const Category = require('../models/category.model');
const { Op } = require('sequelize');

class CategoryRepository {
  static async getListCategories(options = {}) {
    const { limit = 10, page = 1, where = {} } = options;
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (where.status !== undefined) {
      whereClause.status = where.status;
    }

    if (where.name) {
      whereClause.name = {
        [Op.iLike]: `%${where.name}%`
      };
    }

    const { count, rows } = await Category.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      total: count,
      data: rows
    };
  }

  static async getCategoryById(id) {
    return await Category.findByPk(id);
  }

  static async getAllCategories() {
    return await Category.findAll({
      where: { status: true },
      order: [['name', 'ASC']],
      attributes: ['id', 'name']
    });
  }

  static async createCategory(data) {
    return await Category.create(data);
  }

  static async updateCategory(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;

    await category.update(data);
    return category;
  }

  static async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;

    await category.destroy();
    return true;
  }
}

module.exports = CategoryRepository;
