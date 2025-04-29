const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const CategoryController = require("../controllers/category.controller")
const CategoryValidate = require("../middleware/validate/category.validate");
const { validateIdInPath, validatePagination } = require("../utils/ValidateModel");

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories for user with status = true
 *     responses:
 *       200:
 *         description: Login successfully
 *       400:
 *         description: Login failed
 *       500:
 *         description: Server error
 */
router.get('/all', CategoryController.getAllCategory)

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create category for admin
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Create category successfully
 *       400:
 *         description: Create category failed
 *       500:
 *         description: Server error
 */
router.post('/create', auth(["admin"]), CategoryValidate.createCategory, CategoryController.createCategory)

/**
 * @swagger
 * /api/category/update/{id}:
 *   put:
 *     tags:
 *       - Category
 *     summary: Update category for admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *             required:
 *               - name
 *               - status
 *     responses:
 *       200:
 *         description: Update category successfully
 *       400:
 *         description: Update category failed
 *       500:
 *         description: Server error
 */
router.put('/update/:id', auth(["admin"]), validateIdInPath, CategoryValidate.updateCategory, CategoryController.updateCategory);

/**
 * @swagger
 * /api/category/delete/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete category for admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       200:
 *         description: Delete category successfully
 *       400:
 *         description: Delete category failed
 *       500:
 *         description: Server error
 */
router.delete('/delete/:id', auth(["admin"]), validateIdInPath, CategoryController.deleteCategory);

/**
 * @swagger
 * /api/category/detail/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to get
 *     responses:
 *       200:
 *         description: Get category successfully
 *       400:
 *         description: Get category failed
 *       500:
 *         description: Server error
 */
router.get('/detail/:id', auth(["admin"]), validateIdInPath, CategoryController.getCategoryById);

/**
 * @swagger
 * /api/category/list:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get list category with paging
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the category to get
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *         description: Status of the category to get
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: Page of the category to get
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: Limit of the category to get
 *     responses:
 *       200:
 *         description: Get list category successfully
 *       400:
 *         description: Get list category failed
 *       500:
 *         description: Server error
 */
router.get('/list', auth(["admin"]), validatePagination, CategoryValidate.getListCategory, CategoryController.getListCategories);


module.exports = router