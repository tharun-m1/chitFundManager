const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const errorHandler = require("../../utils/error");
//------------Sign Up-------------------------------------------------------------------

router.post("/signup", async (req, res, next) => {
  try {
    const { fullName, email, password, phone } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ fullName, email, password: encryptedPassword, phone });
    res.status(200).json({
      message: "User Created Successfully!",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//--------------------------------------------------------------------------------------

//--------------------------Login-------------------------------------------------------

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const adminFound = await Admin.findOne({ email });
    if (!adminFound) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }
    const passMatched = await bcrypt.compare(password, adminFound.password);
    if (!passMatched) {
      return res.status(401).json({
        message: "Incorrect Credentials",
      });
    }
    const jwToken = jwt.sign(
      adminFound._id.toJSON(),
      process.env.JWT_SECRET_KEY
    );
    res.json({
      message: "Logged In.",
      jwToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//----------------------------------------------------------------------------------------
module.exports = router;
