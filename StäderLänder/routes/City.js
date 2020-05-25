var express = require("express");
var fs = require("fs");

var router = express.Router();

router.get("/", function (req, res, next) {
  fs.readFile("stad.json", (err, data) => {
    if (err) throw err;
    var countries = JSON.parse(data);
    res.send(countries);
  });
});

module.exports = router;
