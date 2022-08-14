// var weatherURL = "";

// "https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31";

// Set a variable for search and all temperal literals
// var weatherGeoURL = `api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
var searchInputEl = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var currentDisplayEl = document.querySelector("#current-display");

// var searchHistory = [];
// var searchHistoryContainer = document.querySelector("#history");

//Search button
searchBtn.addEventListener("click", function () {
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
          // Temp
          var currentTemp = data.current.temp;
          var currentTempEl = document.createElement("p");
          currentTempEl.textContent = `Temp: ${currentTemp}`;
          currentDisplayEl.appendChild(currentTempEl);
          // Wind
          var currentWind = data.current.wind_speed;
          var currentWindEl = document.createElement("p");
          currentWindEl.textContent = `Wind: ${currentWind} MPH;`;
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
        });

      // City Name
      console.log(data[0].name);
      var currentCityDisplay = document.createElement("h1");
      currentCityDisplay.textContent = data[0].name;
      currentDisplayEl.appendChild(currentCityDisplay);
    });
  // Save to local storage
  // Creates a list from local storage
  // Clickable event from list to search input
  // Current city display
});

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
