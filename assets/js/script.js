var searchBtn = $(`#search-btn`);
var clearHistory = $(`#clear-history`);
var APIKey = "090e3cee2f136086f9deb58ee30228fb";
var cityName = "";
var currentDay = dayjs().format("YYYY-MM-DD");
var cityNameList = JSON.parse(localStorage.getItem("city-name")) || [];

searchBtn.on(`click`, searchCity);

clearHistory.on(`click`, clearSearchHistory);

// Add an event listener fot enter
$(`#city-name`).on(`keypress`, function (event) {
  if (event.key === "Enter") {
    // console.log(`enter`);
    event.preventDefault();
    searchBtn.click();
  }
});

//Add a function to make sure the first letter always capital
$(`#city-name`).on("change keydown paste", function (e) {
  if ((this.value.length = 1)) {
  }
  var cityName = $(this).val();
  capCityName = cityName.toLowerCase().replace(/\b[a-z]/g, function (char) {
    return char.toUpperCase();
  });
  $(this).val(capCityName);
});

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function searchCity(event) {
  event.preventDefault();

  cityName = $(`#city-name`).val();
  if (cityName === "" || isNaN(cityName) === false) {
    return window.alert(`Please input a city name!`);
  }

  if (cityNameList.includes(cityName)) {
    return window.alert(`This city has been added to the search history`);
  }

  console.log(cityName);

  cityNameList.push(cityName);

  localStorage.setItem(`city-name`, JSON.stringify(cityNameList));
  cityWeather(cityName);
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
      // console.log(data);
      // console.log(data.cod);
      if (data.cod === `404`) {
        window.alert(data.message);
        return;
      }
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
      $(`#infoCity`).empty();
      $(`#targetCity`).append(cityInfo);
      searchHistory(cityName);
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
      //   console.log(data.list[11].dt_txt.split(" ")[1]);
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.split(" ")[1] === `12:00:00`) {
          console.log(data.list[i].dt_txt.split(" ")[1]);
          var cityInfo = $(`<div>`);
          cityInfo.addClass("col-2 bg-light text-dark");
          var date = $(`<h3>`).append(data.list[i].dt_txt.split(" ")[0]);

          var tempCelsius = Math.round(data.list[i].main.temp - 273.15);
          var temperature = $(`<p>`).append(
            `Temperature: ` + tempCelsius + ` °C`
          );
          var wind = $(`<p>`).append(
            `Wind: ` + data.list[i].wind.speed + ` m/s`
          );
          var humidity = $(`<p>`).append(
            `Humidity: ` + data.list[i].main.humidity + ` %`
          );
          var weatherIcon = $(`<image class="rounded mx-auto d-block">`).attr(
            `src`,
            `http://openweathermap.org/img/wn/` +
              data.list[i].weather[0].icon +
              `@2x.png`
          );
          cityInfo
            .append(date)
            .append(weatherIcon)
            .append(temperature)
            .append(wind)
            .append(humidity);

          $(`#infoCity`).append(cityInfo);
        }
      }
    });
}

// clear the search history
function clearSearchHistory() {
  $(`#search-history`).empty();
  cityNameList.empty();
  localStorage.clear();
}

// print localstorage city name to the search History
for (let i = 0; i < cityNameList.length; i++) {
  searchHistory(cityNameList[i]);
}
