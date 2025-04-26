const { validateEmail } = require("../../utils/ValidateModel");

class AuthValidate {
  static login(req, res, next) {
    const { email, password } = req.body;

    if (!email) {
      return next({ status: 400, message: "Email is required" });
    }

    if (!validateEmail(email)) {
      return next({ status: 400, message: "Email must be a valid email" });
    }

    if (!password) {
      return next({ status: 400, message: "Password is required" });
    }

    next();
  }

  static register(req, res, next) {
    const { name, email, password, phone } = req.body;

    if (!name) {
      return next({ status: 400, message: "Name is required" });
    }

    if (!email) {
      return next({ status: 400, message: "Email is required" });
    }

    if (!validateEmail(email)) {
      return next({ status: 400, message: "Email must be a valid email" });
    }

    if (!password) {
      return next({ status: 400, message: "Password is required" });
    }

    if (password.length < 6) {
      return next({ status: 400, message: "Password must be at least 6 characters" });
    }

    if (!phone) {
      return next({ status: 400, message: "Phone is required" });
    }

    if (phone.length !== 10) {
      return next({ status: 400, message: "Phone must be 10 digits" });
    }

    next();
  }
}

module.exports = AuthValidate