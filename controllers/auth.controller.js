const AuthService = require("../services/auth.service")
const ResponseFormatter = require("../utils/ResponseFormatter")

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login({ email, password });
      res.status(200).json(ResponseFormatter.success(
        data,
        "Login successfully",
        200
      ));
    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { email, name, password, phone, address } = req.body;
      const data = await AuthService.register({ name, email, password, phone, address });
      res.status(200).json(ResponseFormatter.success(
        data,
        "Register successfully",
        200
      ));
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AuthController