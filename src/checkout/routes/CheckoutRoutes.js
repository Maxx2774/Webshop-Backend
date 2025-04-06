const express = require("express");
const { order } = require("../controllers/CheckoutControllers");

const router = express.Router();

router.post("/orders", order);

module.exports = router;
