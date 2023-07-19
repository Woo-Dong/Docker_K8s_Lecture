var express = require("express");
var app = express();

app.get("/", function (req, res) {
  let host_name = process.env.HOSTNAME;
  res.send(`response from Express APP - ${host_name}!!!`);
});

app.listen(3000, "0.0.0.0");
