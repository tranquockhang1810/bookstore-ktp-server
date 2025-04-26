const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthValidate = require("../middleware/validate/auth.validate");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Login failed
 *       500:
 *         description: Server error
 */
router.post("/login", AuthValidate.login ,AuthController.login);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register for user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               phone:
 *                 type: string
 *                 required: true
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Register successfully
 *       400:
 *         description: Register failed
 *       500:
 *         description: Server error
 */
router.post("/register", AuthValidate.register, AuthController.register);

module.exports = router;