const express = require("express");
const { addTestData, deleteData } = require("../controllers/TestControllers");

const router = express.Router();

router.post("/admin/add-test-data", addTestData);
router.delete("/admin/delete-test-data", deleteData);

module.exports = router;
