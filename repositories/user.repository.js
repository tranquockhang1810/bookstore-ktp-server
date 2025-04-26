const User = require('../models/user.model');

class UserRepository {

  static async createUser(data) {
    return await User.create(data);
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
    return user;
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  }

  static async listUsers(options = {}) {
    const { limit = 10, page = 1, where = {} } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
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
