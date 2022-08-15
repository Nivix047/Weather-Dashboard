// var weatherURL = "";

// "https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31";

// Set a variable for search and all temperal literals
// var weatherGeoURL = `api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
var searchInputEl = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var currentDisplayEl = document.querySelector("#current-display");
var forecastEl = document.querySelector("#forecast");
var searchHistory = [];
var searchHistoryContainerEl = document.querySelector("#search-history");
var searchHistoryList =
  JSON.parse(localStorage.getItem("search history")) || [];

//Search button
searchBtn.addEventListener("click", function () {
  // Clears the search results so it doesn't duplicate
  currentDisplayEl.innerHTML = "";
  forecastEl.innerHTML = "";
  // DOM on API for search results
  var search = searchInputEl.value.toString();
  var weatherGeoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=54025b88abec8d86cdfc8b7b376ecf31`;
  console.log(searchInputEl.value);

  //API for Geo
  fetch(weatherGeoURL)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //API for weather
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31`
      )
        .then(function (response) {
          // console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          console.log(typeof data);
          // Display for current current weather for city searched
          // Temp need to add a fahrenheit symbol
          var currentTemp = data.current.temp;
          var currentTempEl = document.createElement("p");
          currentTempEl.textContent = `Temp: ${currentTemp}`;
          currentDisplayEl.appendChild(currentTempEl);
          // Wind
          var currentWind = data.current.wind_speed;
          var currentWindEl = document.createElement("p");
          currentWindEl.textContent = `Wind: ${currentWind} MPH`;
          currentDisplayEl.appendChild(currentWindEl);
          // Humidity
          var currentHumidity = data.current.humidity;
          console.log(currentHumidity);
          var currentHumidityEl = document.createElement("p");
          currentHumidityEl.textContent = `Humidity: ${currentHumidity} %`;
          currentDisplayEl.appendChild(currentHumidityEl);
          // UV Index
          // Need if/else statement for it to turn green or red
          var currentUV = data.current.uvi;
          console.log(currentUV);
          var currentUVEl = document.createElement("p");
          currentUVEl.textContent = `UV Index: ${currentUV}`;
          currentDisplayEl.appendChild(currentUVEl);
          // 5 day forecast: current + 5
          var forecastList = data.daily;
          console.log(forecastList);
          var forecastListHeaderEl = document.createElement("div");
          forecastEl.appendChild(forecastListHeaderEl);
          // Turned timestamp from API to calender time
          var ts = new Date(forecastList[0].dt * 1000);
          var forecastDate = ts.toLocaleDateString();
          console.log(forecastDate);
          var forecastDateEl = document.createElement("h5");
          forecastDateEl.textContent = forecastDate;
          forecastListHeaderEl.appendChild(forecastDateEl);
          // forecast Temp
          // Need to add fahrenheit
          var forecastTemp = forecastList[0].temp.day;
          var forecastTempEl = document.createElement("p");
          forecastTempEl.textContent = `Temp: ${forecastTemp}`;
          forecastEl.appendChild(forecastTempEl);
          // forecast Wind
          var forecastWind = forecastList[0].wind_speed;
          console.log(forecastWind);
          var forecastWindEl = document.createElement("p");
          forecastWindEl.textContent = `Wind: ${forecastWind} MPH`;
          forecastEl.appendChild(forecastWindEl);
          // forecast Humidity
          var forecastHumidity = forecastList[0].humidity;
          console.log(forecastHumidity);
          var forecastHumidityEl = document.createElement("p");
          forecastHumidityEl.textContent = `Humidity: ${forecastHumidity} %`;
          forecastEl.appendChild(forecastHumidityEl);
        });

      // City Name
      // Need to add date
      console.log(data[0].name);
      var currentCityDisplay = document.createElement("h1");
      currentCityDisplay.textContent = data[0].name;
      currentDisplayEl.appendChild(currentCityDisplay);
    });
  // Save to local storage
  searchHistory.push(searchInputEl.value);
  localStorage.setItem("search history", JSON.stringify(searchHistory));
  // Creates a list from local storage
  // Clickable event from list to search input
  // Current city display
  renderSearchHistory();
});

// console.log(searchHistoryList[0]);
// for (i = 0; i < 5; i++) {
//   console.log(searchHistoryList[i]);
// }

function renderSearchHistory() {
  searchHistoryContainerEl.innerHTML = "";
  for (i = 0; i < 5; i++) {
    var searchList = document.createElement("li");
    searchList.setAttribute("type", "button");
    searchList.textContent = searchHistoryList[i];
    searchHistoryContainerEl.append(searchList);
  }
}

renderSearchHistory();

// var searchHistory = [];
// var searchHistoryContainer = document.querySelector("#history");

// function renderSearchHistory() {
//   searchHistoryContainer.innerHTML = "";
//   for (var i = searchHistory.length - 1; i >= 0; i--) {
//     var btn = document.createElement("button");
//     btn.setAttribute("type", "button");
//     btn.setAttribute("data-search", searchHistory[i]);
//     btn.textContent = searchHistory[i];
//     searchHistoryContainer.append(btn);
//   }
// }
// function appendToHistory(search) {
//   searchHistory.push(search);
//   localStorage.setItem("search-history", JSON.stringify(searchHistory));
//   //display
//   renderSearchHistory();
// }

// function handleSearchFormSubmit() {
// grab text in the search
// }
// searchform.addEventListener("submit", handleSearchFormSubmit);
