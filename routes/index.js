const express = require("express");
const router = express.Router();

router.use("/api/auth", require("./auth.route"));
router.use("/api/category", require("./category.route"));
router.use("/api/book", require("./book.route"));
router.use("/api/cart", require("./cart.route"));
router.use("/api/bills", require("./bill.route"));

module.exports = router;
