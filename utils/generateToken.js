const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = user => jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "8h" });
