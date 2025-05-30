const UserService = require('../services/user.service');
const ResponseFormatter = require('../utils/ResponseFormatter');

class UserController {
  static async createUser(req, res, next) {
    try {
      const data = await UserService.createUser(req.body);
      res.status(201).json(ResponseFormatter.success(data, "Create user success"));
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const updatedUser = await UserService.updateUser(userId, req.body);
      if (!updatedUser) {
        return res.status(404).json(ResponseFormatter.error("User not found"));
      }

      res.status(200).json(ResponseFormatter.success(updatedUser, "Update user success"));
    } catch (error) {
      next(error);
    }
  }

  static async listUsers(req, res, next) {
    try {
      const {
        name,
        email,
        phone,
        status,
        role,
        page = 1,
        limit = 10
      } = req.query;

      const options = {
        page: Number(page),
        limit: Number(limit),
        search: {
          name,
          email,
          phone,
          status,
          role
        }
      };

      const { total, data } = await UserService.getListUsers(options);

      res.status(200).json(ResponseFormatter.paginatedList(
        data,
        total,
        page,
        limit,
        "Get list users success"
      ));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
