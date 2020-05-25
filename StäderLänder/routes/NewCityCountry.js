var express = require("express");
var fs = require("fs");

var router = express.Router();
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
/*
var express = require("express");
var fs = require("fs");

var router = express.Router();


router.get("/", function (req, res, next) {
    fs.readFile("users.json", (err, data) => {
      if (err) throw err;
      var users = JSON.parse(data);
      newUser = {
        id: 4,
        userName: "Pelle Pung",
        userMail: "Pelle@pornhub.com",
      };
  
      users.push(newUser);
  
      var saveUsers = JSON.stringify(users, null, 2);
      fs.writeFile("users.json", saveUsers, (err, data) => {
        if (err) throw err;
      });
      res.send("ny användare sparad");
    });
  });
  
  module.exports = router;
*/
