var searchBtn = $(`#search-btn`);
var clearHistory = $(`#clear-history`);
var APIKey = "090e3cee2f136086f9deb58ee30228fb";
var cityName = "";
var currentDay = dayjs().format("MM/DD/YYYY");

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
  searchHistory(cityName);
}

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function searchHistory(cityName) {
  var newList = $(`<li>`);
  var create = $("<button>");
  create.attr("class", "btn btn-outline-secondary btn-lg  my-1");

  create.attr("id", "cityBtn");
  create.text(cityName);
  newList.append(create);
  $(`#search-history`).prepend(newList);
  $(`#cityBtn`).on(`click`, function () {
    var btnRequest = $(this).text();
    cityWeather(btnRequest);
  });
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
function cityWeather(cityName) {
  var weatherAPI =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    cityName +
    `&appid=` +
    APIKey;

  fetch(weatherAPI, {})
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var cityInfo = $(`<div col-12>`).append(
        $(`<h2>` + data.name + ` ` + currentDay + `</h2>`)
      );
      var tempCelsius = Math.round(data.main.temp - 273.15);
      var temperature = $(`<p>`).append(`Temperature: ` + tempCelsius + ` °C`);
      var wind = $(`<p>`).append(`Wind: ` + data.wind.speed + ` m/s`);
      var humidity = $(`<p>`).append(`Humidity: ` + data.main.humidity + ` %`);
      var weatherIcon = $(`<image class="rounded mx-auto d-block">`).attr(
        `src`,
        `http://openweathermap.org/img/wn/` + data.weather[0].icon + `@2x.png`
      );
      var latAndLon = `lat=` + data.coord.lat + `&lon=` + data.coord.lon;
      cityInfo
        .append(weatherIcon)
        .append(temperature)
        .append(wind)
        .append(humidity);
      cityForecast(latAndLon);

      $(`#targetCity`).empty();
      $(`#targetCity`).append(cityInfo);
    });
}

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
function cityForecast(latAndLon) {
  var forecastAPI =
    `https://api.openweathermap.org/data/2.5/forecast?` +
    latAndLon +
    `&appid=` +
    APIKey;

  fetch(forecastAPI, {})
    .then(function (response) {
      //   console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function SaveLocal() {}

function clearSearchHistory() {
  $(`#search-history`).empty();
}
searchHistory();
