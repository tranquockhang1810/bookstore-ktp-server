const User = require('../models/user.model');
const { Op, literal } = require('sequelize');
const TokenService = require('../services/token.service');

class UserRepository {

  static async createUser(data) {
    const hashedPassword = await TokenService.hashPassword(data.password);
    const newUser = await User.create({
      ...data,
      password: hashedPassword
    });
    return {
      ...newUser.dataValues,
      password: undefined
    }
  }

  static async getUserById(id) {
    return await User.findByPk(id);
  }

  static async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async updateUser(id, data) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.update(data);
    return {
      ...user.dataValues,
      password: undefined
    };
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  }

  static async listUsers(options = {}) {
    const {
      limit = 10,
      page = 1,
      search = {},
    } = options;

    const offset = (page - 1) * limit;
    const { name, email, phone, status, role } = search;

    const whereClause = {};

    if (email) {
      whereClause.email = { [Op.iLike]: `%${email}%` };
    }

    if (phone) {
      whereClause.phone = { [Op.iLike]: `%${phone}%` };
    }

    if (status) {
      whereClause.status = status;
    }

    if (role) {
      whereClause.role = role;
    }

    // Tìm kiếm theo tên
    if (name) {
      const searchValue = `%${name}%`;

      whereClause[Op.and] = [
        literal(`unaccent("User"."name") ILIKE unaccent('${searchValue}')`)
      ];
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      total: count,
      data: rows
    };
  }

}

module.exports = UserRepository;
