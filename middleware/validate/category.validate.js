class CategoryValidate {
  static createCategory(req, res, next) {
    const { name } = req.body;

    if (!name) {
      return next({ status: 400, message: "Name is required" });
    }

    next();
  }

  static updateCategory(req, res, next) {
    const { name, status } = req.body;

    if (!name) {
      return next({ status: 400, message: "Name is required" });
    }

    if (status === undefined) {
      return next({ status: 400, message: "Status is required" });
    }

    if (!["true", "false"].includes(status)) {
      return next({ status: 400, message: "Status must be true or false" });
    }

    next();
  }

  static getListCategory (req, res, next) {
    const { name, status } = req.query;

    if (name && name === "") {
      return next({ status: 400, message: "Name is required" });
    }

    if (status && !["true", "false"].includes(status)) {
      console.log(typeof status);
      
      return next({ status: 400, message: "Status must be true or false" });
    }

    next();
  }
}

module.exports = CategoryValidate