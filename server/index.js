const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "All good",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server runnig at http://localhost:${process.env.PORT}`);
});
