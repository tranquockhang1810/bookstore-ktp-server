const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { validateIdInPath, validatePagination } = require("../utils/ValidateModel");
const UserValidate = require("../middleware/validate/user.validate");

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *               address:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Create user success
 *       400:
 *         description: Create user failed
 */
router.post("/create", auth(["admin"]), UserValidate.validateUserInput, UserController.createUser);

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update an existing user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Update user success
 *       400:
 *         description: Update user failed
 */
router.put("/update/:id", auth(["admin"]), validateIdInPath, UserValidate.validateUserInput, UserController.updateUser);

/**
 * @swagger
 * /api/user/list:
 *   get:
 *     tags:
 *       - User
 *     summary: Get list of users with filters and pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, user]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: Get users successfully
 *       400:
 *         description: Get users failed
 */
router.get("/list", auth(["admin"]), validatePagination, UserController.listUsers);

module.exports = router;
