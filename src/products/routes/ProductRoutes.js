const express = require("express");
const {
  getProducts,
  getProductById,
  getCategories,
} = require("../controllers/Products");

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:productId", getProductById);

router.get("/categories", getCategories);

module.exports = router;
