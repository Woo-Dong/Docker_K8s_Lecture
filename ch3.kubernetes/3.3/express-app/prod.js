var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("response from Express APP!!!");
});

app.listen(3000, "0.0.0.0");
