const CategoryService = require("../../services/category.service");

class BookValidate {
  static async createBook(req, res, next) {
    const { name, author, price, categoryId } = req.body;

    if (!name) return next({ status: 400, message: "Name is required" });
    if (!author) return next({ status: 400, message: "Author is required" });
    if (!price) return next({ status: 400, message: "Price is required" });
    if (isNaN(price)) return next({ status: 400, message: "Price must be a number" });
    if (!categoryId) return next({ status: 400, message: "Category ID is required" });
    if (await CategoryService.getCategoryById(categoryId) === null)
      return next({ status: 400, message: "Invalid category ID" });
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next({ status: 400, message: "At least one image file is required" });
    }

    next();
  }

  static async updateBook(req, res, next) {
    const { name, author, price, categoryId, status, totalAmount, newImages } = req.body;

    if (name && typeof name !== "string")
      return next({ status: 400, message: "Name must be a string" });

    if (author && typeof author !== "string")
      return next({ status: 400, message: "Author must be a string" });

    if (price !== undefined && isNaN(price))
      return next({ status: 400, message: "Price must be a number" });

    if (categoryId && typeof categoryId !== "string")
      return next({ status: 400, message: "Category ID must be a string" });

    if (await CategoryService.getCategoryById(categoryId) === null)
      return next({ status: 400, message: "Invalid category ID" });

    if (status !== undefined && !["true", "false", true, false].includes(status))
      return next({ status: 400, message: "Status must be true or false" });

    if (totalAmount !== undefined && isNaN(totalAmount))
      return next({ status: 400, message: "Total amount must be a number" });

    if (newImages && !Array.isArray(newImages)) {
      return next({ status: 400, message: "newImages must be an array of files" });
    }

    next();
  }

  static getListBooks(req, res, next) {
    const { status, fromPrice, toPrice, sortDirection } = req.query;

    if (status !== undefined && !["true", "false"].includes(status)) {
      return next({ status: 400, message: "Status must be true or false" });
    }

    if (fromPrice !== undefined && isNaN(fromPrice)) {
      return next({ status: 400, message: "fromPrice must be a number" });
    }

    if (toPrice !== undefined && isNaN(toPrice)) {
      return next({ status: 400, message: "toPrice must be a number" });
    }

    if (sortDirection && !["ASC", "DESC"].includes(sortDirection)) {
      return next({ status: 400, message: "sortDirection must be ASC or DESC" });
    }

    next();
  }
}

module.exports = BookValidate;
