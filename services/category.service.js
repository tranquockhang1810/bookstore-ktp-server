const CategoryRepository = require("../repositories/category.repository");

class CategoryService {
  static async createCategory(data) {
    return await CategoryRepository.createCategory(data);
  }

  static async updateCategory(id, data) {
    return await CategoryRepository.updateCategory(id, data);
  }

  static async deleteCategory(id) {
    return await CategoryRepository.deleteCategory(id);
  }

  static async getCategoryById(id) {
    return await CategoryRepository.getCategoryById(id);
  }

  static async getAllCategories() {
    return await CategoryRepository.getAllCategories();
  }

  static async getListCategories(options = {}) {
    return await CategoryRepository.getListCategories(options);
  }
}

module.exports = CategoryService;