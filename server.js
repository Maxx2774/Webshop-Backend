require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRoutes = require("./src/auth/routes/AuthRoutes");
const productRoutes = require("./src/products/routes/ProductRoutes");
const adminRoutes = require("./src/admin/routes/AdminRoutes");
const checkoutRoutes = require("./src/checkout/routes/CheckoutRoutes");
const testRoutes = require("./src/test/routes/TestRoutes");
const userRoutes = require("./src/users/routes/UserRoutes");
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Allow all origins
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.get("/", (req, res) => {
  res.json({ message: "Success" });
});
app.get("/home", (req, res) => {
  const { username } = req.query;
  res.json({ message: username });
});

app.use(authRoutes);
app.use(productRoutes);
app.use(adminRoutes);
app.use(checkoutRoutes);
app.use(testRoutes);
app.use(userRoutes);

app.listen(3000);

module.exports = app;
