const CategoryService = require("../services/category.service")
const ResponseFormatter = require("../utils/ResponseFormatter")

class CategoryController {
  static async getAllCategory (req, res, next) {
    try {
      const data = await CategoryService.getAllCategories();
      res.status(200).json(ResponseFormatter.success(
        data,
        "Get all category success"
      ))
    } catch (error) {
      next(error)
    }
  }

  static async createCategory (req, res, next) {
    try {
      const { name, description } = req.body;
      const data = await CategoryService.createCategory({ name, description });
      res.status(200).json(ResponseFormatter.success(
        data,
        "Create category success"
      ))
    } catch (error) {
      next(error)
    }
  }

  static async updateCategory (req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, status } = req.body;
      const data = await CategoryService.updateCategory(id, { name, description, status });
      res.status(200).json(ResponseFormatter.success(
        data,
        "Update category success"
      ))
    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory (req, res, next) {
    try {
      const { id } = req.params;
      const data = await CategoryService.deleteCategory(id);
      res.status(200).json(ResponseFormatter.success(
        data,
        "Delete category success"
      ))
    } catch (error) {
      next(error)
    }
  }

  static async getCategoryById (req, res, next) {
    try {
      const { id } = req.params;
      const data = await CategoryService.getCategoryById(id);
      res.status(200).json(ResponseFormatter.success(
        data,
        "Get category by id success"
      ))
    } catch (error) {
      next(error)
    }
  }

  static async getListCategories (req, res, next) {
    try {
      const { name, status, page, limit } = req.query;
      const { data, total } = await CategoryService.getListCategories({ where: { name, status }, page, limit });
      res.status(200).json(ResponseFormatter.paginatedList(
        data,
        total,
        page,
        limit,
        "Get list category success"
      ))
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController