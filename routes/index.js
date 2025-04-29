const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth.route"));
router.use("/api/category", require("./category.route"))

module.exports = router;
