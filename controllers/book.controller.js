const BookService = require("../services/book.service");
const UploadService = require("../services/upload.service");
const ResponseFormatter = require("../utils/ResponseFormatter");

class BookController {
  static async createBook(req, res, next) {
    try {
      const { files, body } = req;

      let imageUrls = [];
      if (files && files.length > 0) {
        imageUrls = await UploadService.uploadMultiple(files);
      }

      const data = await BookService.createBook({
        ...body,
        images: imageUrls,
      });

      res.status(200).json(ResponseFormatter.success(data, "Create book success"));
    } catch (error) {
      next(error);
    }
  }

  static async updateBook(req, res, next) {
    try {
      const { files, body, params } = req;
      const bookId = params.id;

      let imagesToKeep = body.images && body.images.split(',');

      // upload các hình mới nếu có
      let uploadedUrls = [];
      if (files && files.length > 0) {
        uploadedUrls = await UploadService.uploadMultiple(files);
      }

      const updatedData = {
        ...body,
        images: [...imagesToKeep, ...uploadedUrls],
      };

      const updatedBook = await BookService.updateBook(bookId, updatedData);

      res.status(200).json(ResponseFormatter.success(updatedBook, "Update book success"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const data = await BookService.deleteBook(id);
      res.status(200).json(ResponseFormatter.success(
        data,
        "Delete book success"
      ));
    } catch (error) {
      next(error);
    }
  }

  static async getBookById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await BookService.getBookById(id);
      res.status(200).json(ResponseFormatter.success(
        data,
        "Get book by id success"
      ));
    } catch (error) {
      next(error);
    }
  }

  static async getListBooks(req, res, next) {
    try {
      const {
        search,
        status,
        fromPrice,
        toPrice,
        categoryIds,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortDirection = 'DESC'
      } = req.query;

      const where = {
        search,
        status,
        fromPrice: fromPrice ? Number(fromPrice) : undefined,
        toPrice: toPrice ? Number(toPrice) : undefined,
        categoryIds: categoryIds ? categoryIds.split(',') : undefined,
      };

      const { data, total } = await BookService.getListBooks({
        where,
        page: Number(page),
        limit: Number(limit),
        sortBy,
        sortDirection,
      });

      res.status(200).json(ResponseFormatter.paginatedList(
        data,
        total,
        page,
        limit,
        "Get list books success"
      ));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BookController;
