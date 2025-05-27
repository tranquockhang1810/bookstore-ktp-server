const BillService = require('../services/bill.service');
const ResponseFormatter = require('../utils/ResponseFormatter');

class BillController {
  static async create(req, res, next) {
    try {
      const { cartItems, paymentMethod } = req.body;
      const userId = req.user.id;

      const data = await BillService.createBillByCartItemIds(userId, cartItems, paymentMethod);
      res.status(200).json(ResponseFormatter.success(
        data,
        'Create bill success'
      ));
    } catch (error) {
      next(error);
    }
  }

  static async getMyBills(req, res, next) {
    try {
      const userId = req.user.id;
      const data = await BillService.getUserBills(userId);
      res.status(200).json(ResponseFormatter.success(
        data,
        'Get user bills success'
      ));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
      const { page, limit, status, fromDate, toDate } = req.query;
      const { total, data } = await BillService.getAllBills({ status, fromDate, toDate, limit: Number(limit), page: Number(page) });
      res.status(200).json(ResponseFormatter.paginatedList(
        data,
        total,
        Number(page),
        Number(limit),
        'Get all bills success'
      ));
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const data = await BillService.updateStatus(id, status);
      res.status(200).json(ResponseFormatter.success(
        data,
        'Update bill status success'
      ));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BillController;
