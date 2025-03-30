const express = require("express");
const { getUsers } = require("../controllers/UserControllers");
const { authenticateToken } = require("../../auth/controllers/AuthControllers");
const { checkAdmin } = require("../../admin/controllers/AdminControllers");

const router = express.Router();

// Bara ADMIN som kan se alla användare.
router.get("/admin/users", authenticateToken, checkAdmin, getUsers);

module.exports = router;
