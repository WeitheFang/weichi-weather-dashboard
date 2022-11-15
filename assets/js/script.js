var searchBtn = $(`#search-btn`);
var clearHistory = $(`#clear-history`);
var APIKey = "090e3cee2f136086f9deb58ee30228fb";
var cityName = "";
// var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
// var locationAPI =`http://api.openweathermap.org/geo/1.0/direct?q=` +cityName +`&limit=5&appid=` +APIKey;

searchBtn.on(`click`, searchCity);
clearHistory.on(`click`, clearSearchHistory);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function searchCity(event) {
  event.preventDefault();

  cityName = $(`#city-name`).val();
  if (cityName === "") {
    return window.alert(`Please input a city name!`);
  }
  console.log(cityName);

  cityWeather(cityName);
  SaveLocal(cityName);
}

function searchHistory(cityName) {
  var newList = $(`<li>`);
  var create = $("<button>");
  create.attr("class", "btn btn-outline-secondary btn-lg my-1");
  create.attr("id", "cityBtn");
  create.text(cityName);
  newList.append(create);
  $(`#search-history`).prepend(newList);
}

function cityWeather() {}
function SaveLocal() {}
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function clearSearchHistory() {
  $(`#search-history`).empty();
}
searchHistory();
