const BillRepository = require('../repositories/bill.repository');


class BillService {
  static async createBillByCartItemIds(userId, cartItemIds, paymentMethod = 'COD') {
    return await BillRepository.createBillFromCartItemIds(userId, cartItemIds, paymentMethod);
  }

  static async getUserBills(userId) {
    return await BillRepository.getByUser(userId);
  }

  static async getAllBills(filters) {
    return await BillRepository.getAll(filters);
  }

  static async updateStatus(billId, status) {
    return await BillRepository.updateStatus(billId, status);
  }
}

module.exports = BillService;
