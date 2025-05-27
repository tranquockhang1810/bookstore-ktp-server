const CartService = require('../services/cart.service');
const ResponseFormatter = require('../utils/ResponseFormatter');

class CartController {
  static async getUserCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await CartService.getUserCart(userId);
      res.json(ResponseFormatter.success(cart, 'Get cart success'));
    } catch (err) {
      next(err);
    }
  }

  static async addToCart(req, res, next) {
    try {
      const userId = req.user.id;
      const { bookId, quantity } = req.body;
      const item = await CartService.addOrUpdate(userId, bookId, quantity);
      res.json(ResponseFormatter.success(item, 'Added to cart'));
    } catch (err) {
      next(err);
    }
  }

  static async updateQuantity(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const updated = await CartService.updateQuantity(id, quantity);
      res.json(ResponseFormatter.success(updated, 'Updated cart item quantity'));
    } catch (err) {
      next(err);
    }
  }

  static async deleteCartItem(req, res, next) {
    try {
      const { id } = req.params;
      await CartService.remove(id);
      res.json(ResponseFormatter.success(true, 'Removed item from cart'));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
