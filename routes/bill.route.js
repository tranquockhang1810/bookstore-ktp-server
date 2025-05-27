const express = require('express');
const router = express.Router();
const BillController = require('../controllers/bill.controller');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/bills:
 *   post:
 *     summary: Tạo đơn hàng từ giỏ hàng
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Danh sách ID của các item trong giỏ hàng
 *             required:
 *               - cartItems
 *     responses:
 *       200:
 *         description: Tạo đơn hàng thành công
 */
router.post('/', auth(), BillController.create);

/**
 * @swagger
 * /api/bills/my:
 *   get:
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn hàng
 */
router.get('/my', auth(), BillController.getMyBills);

/**
 * @swagger
 * /api/bills:
 *   get:
 *     summary: Admin xem danh sách tất cả đơn hàng
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid, cancelled]
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Trả về danh sách đơn hàng
 */
router.get('/', auth(['admin']), BillController.getAll);

/**
 * @swagger
 * /api/bills/{id}/status:
 *   patch:
 *     summary: Cập nhật trạng thái đơn hàng
 *     tags: [Bill]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, cancelled]
 *     responses:
 *       200:
 *         description: Trạng thái đã được cập nhật
 */
router.patch('/:id/status', auth(['admin']), BillController.updateStatus);

module.exports = router;
