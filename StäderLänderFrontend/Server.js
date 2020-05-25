var cityVisited = new Array();

window.addEventListener("load", function () {
  if (localStorage.getItem("City") !== null) {
    cityVisited = JSON.parse(localStorage.getItem("City"));
    console.log(cityVisited);
    console.log(localStorage.getItem("City"));
  }
});

function saveUsersToLocal(cityId) {
  console.log(cityId);
  cityVisited.push(cityId);
  localStorage.setItem("City", JSON.stringify(cityVisited));
}

fetch("http://localhost:5002/country")
  .then((response) => response.json())
  .then((data) => buildList(data));

function buildList(data) {
  document.getElementById("MainPage").innerHTML = "";
  data.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "cityColumn";
    newDiv.innerHTML =
      "<br><button class='button' id='countryButton' onClick='onCountryClicked(" +
      element.id +
      ")'>" +
      element.countryname;
    var containerDiv = document.getElementById("MainPage");
    containerDiv.appendChild(newDiv);
  });
  var secondDiv = document.createElement("div");
  secondDiv.className = "buttonDivVisited";
  secondDiv.innerHTML =
    "</button><br><button class='button2' id='visitedButton' onclick='showVisitedCities()'>VisitedCities</button>" +
    "<br><br><button class='button2' id='addButton' onclick='addNewCountry()'>NewCountry</button>";
  var secondContainerDiv = document.getElementById("MainPage");
  secondContainerDiv.appendChild(secondDiv);
}

function addNewCountry() {
  document.getElementById("MainPage").innerHTML = "";
  document.getElementById("headerText").innerHTML = "Add Country";
  var newDiv = document.createElement("div");
  newDiv.className = "addNewCity";
  newDiv.innerHTML =
    "New Country:<br><input type='text' id='newCountry'></input><br>New City:<br><input type='text' id='newCity'></input><br>Population: <br><input type='text' id='newPop'></input><br><button id='submitNew' onclick='postNewCountry'>Submit</button></input>";
  var containerDiv = document.getElementById("MainPage");
  containerDiv.appendChild(newDiv);
}

function postNewCountry() {
  var newCountry = document.getElementById("newCountry").value;
  var newCity = document.getElementById("newCity").value;
  var newPop = document.getElementById("newPop").value;
}

function showVisitedCities() {
  var cityArray = new Array();

  fetch("http://localhost:5002/City")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      cityVisited.forEach((visited) => {
        json.forEach((city) => {
          if (visited == city.id) {
            cityArray.push(city);
          }
        });
      });
    })
    .then(function () {
      var totalPopulation = 0;
      document.getElementById("MainPage").innerHTML = "";
      document.getElementById("headerText").innerHTML = "Visited Cities";
      cityArray.forEach((element) => {
        totalPopulation += element.population;
        console.log(totalPopulation);
        var newDiv = document.createElement("div");
        newDiv.className = "cityColumn";
        newDiv.innerHTML =
          "<br><button class='button' id='cityButton' onClick='onCityClicked(" +
          element.id +
          ")'>" +
          element.stadname +
          "</button>";
        var containerDiv = document.getElementById("MainPage");
        containerDiv.appendChild(newDiv);
      });
      var secondDiv = document.createElement("div");
      secondDiv.className = "population";
      secondDiv.innerHTML = "<br>Total Population visited: " + totalPopulation;
      var secondContainerDiv = document.getElementById("MainPage");
      secondContainerDiv.appendChild(secondDiv);
    });
}

function buildCityList(data, selectedCountryId) {
  var cities = new Array();
  document.getElementById("MainPage").innerHTML = "";
  document.getElementById("headerText").innerHTML = "Cities";
  data.forEach((element) => {
    if (element.countryid == selectedCountryId) cities.push(element);
  });

  cities.forEach((element) => {
    var newDiv = document.createElement("div");
    newDiv.className = "cityColumn";
    newDiv.innerHTML =
      "<br><button class='button' id='cityButton' onClick='onCityClicked(" +
      element.id +
      ")'>" +
      element.stadname +
      "</button>";
    var containerDiv = document.getElementById("MainPage");
    containerDiv.appendChild(newDiv);
  });
}

function buildPopulationList(data, selectedCityId) {
  var city;
  document.getElementById("MainPage").innerHTML = "";
  document.getElementById("headerText").innerHTML = "Population";

  data.forEach((element) => {
    if (element.id == selectedCityId) city = element;
  });

  var newDiv = document.createElement("div");
  newDiv.className = "populationColumn";
  newDiv.innerHTML =
    city.stadname +
    " Population: <br>" +
    city.population +
    "<br><br><button class='button3' id='visitCityButton'>Besök</button>";
  var containerDiv = document.getElementById("MainPage");
  containerDiv.appendChild(newDiv);

  var button = document.getElementById("visitCityButton");
  button.addEventListener("click", () => saveUsersToLocal(city.id));
}

function onCountryClicked(countryId) {
  document.getElementById("headerText").innerHTML = "";

  fetch("http://localhost:5002/City")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      buildCityList(json, countryId);
    });
}

function onCityClicked(cityId) {
  document.getElementById("headerText").innerHTML = "Population";

  fetch("http://localhost:5002/City")
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      buildPopulationList(json, cityId);
    });
}
