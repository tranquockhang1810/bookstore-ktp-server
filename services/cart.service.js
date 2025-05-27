const CartRepository = require('../repositories/cart.repository');

class CartService {
  static async getUserCart(userId) {
    return await CartRepository.getByUser(userId);
  }

  static async addOrUpdate(userId, bookId, quantity) {
    return await CartRepository.addOrUpdate(userId, bookId, quantity);
  }

  static async updateQuantity(id, quantity) {
    return await CartRepository.updateQuantity(id, quantity);
  }

  static async remove(id) {
    return await CartRepository.delete(id);
  }

  static async removeMany(ids) {
    return await CartRepository.deleteMany(ids);
  }
}

module.exports = CartService;
