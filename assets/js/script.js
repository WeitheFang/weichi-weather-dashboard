var searchBtn = $(`#search-btn`);
var APIKey = "090e3cee2f136086f9deb58ee30228fb";
var searchHistoryList = [];
// var fetchUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}`;

searchBtn.on(`click`, searchCity);

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
function searchCity() {
  var cityName = $(this).siblings(`.form-control`).val();

  searchHistoryList.push(cityName);
  localStorage.setItem(`city`, JSON.stringify(searchHistoryList));
  console.log(localStorage);
}

function searchHistory() {
  var cityName = JSON.parse(localStorage.getItem(`city`));

  for (i = 0; i < cityName.length; i++) {
    var create = $("<button>");
    create.attr("class", "btn btn-outline-secondary btn-lg ");
    create.attr("type", "button");
    create.text(cityName[i]);
    console.log(create);
    $(`#search-history`).append(create);
  }
}

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

searchHistory();
