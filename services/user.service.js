const UserRepository = require('../repositories/user.repository');

class UserService {
  static async createUser(data) {
    return await UserRepository.createUser(data);
  }

  static async updateUser(id, data) {
    return await UserRepository.updateUser(id, data);
  }

  static async deleteUser(id) {
    return await UserRepository.deleteUser(id);
  }

  static async getUserById(id) {
    return await UserRepository.getUserById(id);
  }

  static async getUserByEmail(email) {
    return await UserRepository.getUserByEmail(email);
  }

  static async getListUsers(options = {}) {
    return await UserRepository.listUsers(options);
  }
}

module.exports = UserService;
