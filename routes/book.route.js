const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const BookController = require("../controllers/book.controller");
const { validateIdInPath, validatePagination } = require("../utils/ValidateModel");
const BookValidate = require("../middleware/validate/book.validate");

/**
 * @swagger
 * /api/book/create:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create book for admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - author
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *               description:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Create book successfully
 *       400:
 *         description: Create book failed
 *       500:
 *         description: Server error
 */
router.post("/create", auth(["admin"]), upload.array("images"), BookValidate.createBook, BookController.createBook);

/**
 * @swagger
 * /api/book/update/{id}:
 *   put:
 *     tags:
 *       - Book
 *     summary: Update book for admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of image URLs or paths
 *               newImages:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *               description:
 *                 type: string
 *               status:
 *                 type: boolean
 *               categoryId:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Update book successfully
 *       400:
 *         description: Update book failed
 *       500:
 *         description: Server error
 */
router.put("/update/:id", auth(["admin"]), validateIdInPath, upload.array("newImages"), BookValidate.updateBook, BookController.updateBook);

/**
 * @swagger
 * /api/book/delete/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete book for admin
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to delete
 *     responses:
 *       200:
 *         description: Delete book successfully
 *       400:
 *         description: Delete book failed
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", auth(["admin"]), validateIdInPath, BookController.deleteBook);

/**
 * @swagger
 * /api/book/detail/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get book by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to get
 *     responses:
 *       200:
 *         description: Get book successfully
 *       400:
 *         description: Get book failed
 *       500:
 *         description: Server error
 */
router.get("/detail/:id", validateIdInPath, BookController.getBookById);

/**
 * @swagger
 * /api/book/list:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get list of books with filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Keyword search in book name or author
 *       - in: query
 *         name: status
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: fromPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: toPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: categoryIds
 *         schema:
 *           type: string
 *         description: Comma-separated list of category ids
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         default: createdAt
 *       - in: query
 *         name: sortDirection
 *         schema:
 *           type: string
 *         enum: [ASC, DESC]
 *         default: DESC
 *     responses:
 *       200:
 *         description: Get list of books successfully
 *       400:
 *         description: Get list of books failed
 *       500:
 *         description: Server error
 */
router.get("/list", validatePagination, BookValidate.getListBooks, BookController.getListBooks);

module.exports = router;
