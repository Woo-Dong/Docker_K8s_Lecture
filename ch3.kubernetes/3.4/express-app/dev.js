var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("dev mode!!");
});

app.listen(3000, "0.0.0.0");
