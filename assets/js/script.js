var searchBtn = $(`#search-btn`);
var APIKey = "090e3cee2f136086f9deb58ee30228fb";
var searchHistoryList = [];
// var forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;

searchBtn.on(`click`, searchCity);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function searchCity(event) {
  event.preventDefault();
  var cityName = $(this).siblings(`.form-control`).val();
  var locationAPI =
    `http://api.openweathermap.org/geo/1.0/direct?q=` +
    cityName +
    `&limit=5&appid=` +
    APIKey;

  searchHistoryList.push(cityName);

  localStorage.setItem(`city`, JSON.stringify(searchHistoryList));
  console.log(localStorage);

  fetch(locationAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);
    });
  location.reload();
}

function searchHistory() {
  searchHistoryList = JSON.parse(localStorage.getItem(`city`));

  if (searchHistoryList.length > 0) {
    for (i = 0; i < searchHistoryList.length; i++) {
      var create = $("<a>");
      create.attr("class", "btn btn-outline-secondary btn-lg my-1");
      create.attr("href", "#");
      create.attr("role", "button");

      create.text(searchHistoryList[i]);
      console.log(create);
      $(`#search-history`).append(create);
    }
  } else {
    return;
  }
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

searchHistory();
