const express = require("express");
const {
  checkAdmin,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/AdminControllers");
const { authenticateToken } = require("../../auth/controllers/AuthControllers");

const router = express.Router();

router.post("/admin/products/add", authenticateToken, checkAdmin, addProduct);
router.patch(
  "/admin/products/update",
  authenticateToken,
  checkAdmin,
  updateProduct
);
router.delete(
  "/admin/products/delete",
  authenticateToken,
  checkAdmin,
  deleteProduct
);
router.post(
  "/admin/categories/add",
  authenticateToken,
  checkAdmin,
  addCategory
);

router.patch(
  "/admin/categories/update",
  authenticateToken,
  checkAdmin,
  updateCategory
);

router.delete(
  "/admin/categories/delete",
  authenticateToken,
  checkAdmin,
  deleteCategory
);

module.exports = router;
