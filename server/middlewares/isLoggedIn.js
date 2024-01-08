const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = (req, res, next) => {
  try {
    const jwToken = req.headers.authorization;
    const adminId = jwt.verify(jwToken, process.env.JWT_SECRET_KEY);
    req.adminId = adminId;
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = isLoggedIn;
