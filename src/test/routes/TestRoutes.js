const express = require("express");
const {
  addTestData,
  deleteData,
  addBulkTestData,
  removeBulkTestData,
} = require("../controllers/TestControllers");

const router = express.Router();

router.post("/admin/add-test-data", addTestData);
router.delete("/admin/delete-test-data", deleteData);

router.post("/admin/add-bulk-test-data", addBulkTestData);
router.delete("/admin/remove-bulk-test-data", removeBulkTestData);

module.exports = router;
