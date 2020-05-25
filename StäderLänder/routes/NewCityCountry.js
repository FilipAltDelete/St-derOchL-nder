/*
var express = require("express");
var router = express.Router();
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
*/

var express = require("express");
var fs = require("fs");
var app = express();

app.use(express.json());

app.post("/", function (request, response) {
  console.log(request.body); // your JSON
  response.send(request.body); // echo the result back
  var country = request.body.Country;
  var city = request.body.city;
  var pop = request.body.population;

  console.log(country);
  console.log(city);
  console.log(pop);

  fs.readFile("land.json", (err, data) => {
    if (err) throw err;
    var countries = JSON.parse(data);
    let countryId = 0;
    countries.forEach((element) => {
      countryId++;
    });
    newCountry = {
      id: countryId + 1,
      countryname: country,
    };
    countries.push(newCountry);
    var saveCountry = JSON.stringify(countries, null, 2);

    fs.writeFile("land.json", saveCountry, (err, data) => {
      if (err) throw err;
    });

    fs.readFile("stad.json", (err, data) => {
      if (err) throw err;
      var cities = JSON.parse(data);
      let cityId = 0;
      cities.forEach((element) => {
        cityId++;
      });
      newCity = {
        id: cityId,
        stadname: city,
        countryid: countryId + 1,
        population: parseInt(pop),
      };
      cities.push(newCity);
      var saveCity = JSON.stringify(cities, null, 2);
      console.log(saveCity);
      fs.writeFile("stad.json", saveCity, (err, data) => {
        if (err) throw err;
      });
    });
    //res.send("Success!!!");
  });
});

app.listen(3000);
module.exports = app;

/*
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
*/
