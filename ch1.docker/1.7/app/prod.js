var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("prod mode!!!");
});

app.listen(3000, "0.0.0.0");
