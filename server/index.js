const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "All good",
  });
});
//-------------------Routes--------------------------
app.use("/", authRoutes);
//---------------------------------------------------

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() =>
      console.log(`Server runnig at http://localhost:${process.env.PORT}`)
    )
    .catch((err) => {
      console.log("Connection Error:\n", err);
    });
});
