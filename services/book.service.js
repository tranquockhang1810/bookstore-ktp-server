const BookRepository = require("../repositories/book.repository");

class BookService {
  static async createBook(data) {
    return await BookRepository.createBook(data);
  }

  static async updateBook(id, data) {
    return await BookRepository.updateBook(id, data);
  }

  static async deleteBook(id) {
    return await BookRepository.deleteBook(id);
  }

  static async getBookById(id) {
    return await BookRepository.getBookById(id);
  }

  static async getListBooks(options = {}) {
    return await BookRepository.getListBooks(options);
  }
}

module.exports = BookService;
