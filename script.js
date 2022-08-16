// var weatherURL = "";

// "https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31";

// Set a variable for search and all temperal literals
// var weatherGeoURL = `api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
var searchInputEl = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-btn");
var currentDisplayEl = document.querySelector("#current-display");
var forecastEl = document.querySelector("#forecast");
var searchHistoryContainerEl = document.querySelector("#search-history");
var searchHistoryList = JSON.parse(localStorage.getItem("searchHistory")) || [];

//Search button
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  var search = searchInputEl.value.toString();

  if (search !== "") {
    getWeatherData(search);

    // Save to local storage
    searchHistoryList.push(search);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryList));
    renderSearchHistory();
  }
});

// console.log(searchHistoryList[0]);
// for (i = 0; i < 5; i++) {
//   console.log(searchHistoryList[i]);
// }

function renderSearchHistory() {
  searchHistoryContainerEl.innerHTML = "";
  for (var i = 0; i < searchHistoryList.length; i++) {
    var searchList = document.createElement("button");
    // searchList.setAttribute("type", "button");
    searchList.setAttribute("id", "search-list");
    searchList.textContent = searchHistoryList[i];
    searchHistoryContainerEl.append(searchList);
  }
}

function getWeatherData(search) {
  // Clears the search results so it doesn't duplicate
  currentDisplayEl.innerHTML = "";
  forecastEl.innerHTML = "";
  // DOM on API for search results

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

      // Header for current city name
      console.log(data[0].name);
      var currentCityDisplay = document.createElement("h1");
      currentCityDisplay.textContent = data[0].name;
      currentDisplayEl.appendChild(currentCityDisplay);

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
          // Current city after search
          // Icon for current weather
          var currentWeather = data.current.weather[0].icon;
          var currentWeatherURL = `http://openweathermap.org/img/wn/${currentWeather}@2x.png`;
          var currentWeatherEl = document.createElement("img");
          currentWeatherEl.src = currentWeatherURL;
          currentDisplayEl.appendChild(currentWeatherEl);
          // Temp
          var currentTemp = data.current.temp;
          var currentTempEl = document.createElement("p");
          currentTempEl.textContent = `Temp: ${currentTemp} ℉`;
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
          var currentUV = data.current.uvi;
          console.log(currentUV);
          var currentUVEl = document.createElement("p");
          var currentUVVal = document.createElement("span");
          currentUVVal.textContent = currentUV;

          //Testing UV colors
          // currentUVVal.textContent = 8;

          // What is the difference between blue numbers and white numbers on Google Devs?
          console.log(currentUVVal.textContent);
          console.log(currentUV);
          currentUVEl.textContent = "UV Index: ";
          currentUVEl.appendChild(currentUVVal);
          if (currentUVVal.textContent <= 2) {
            currentUVVal.classList.add("low");
          } else if (currentUVVal.textContent <= 5) {
            currentUVVal.classList.add("moderate");
            currentUVVal.classList.remove("low");
          } else if (currentUVVal.textContent <= 7) {
            currentUVVal.classList.add("high");
            currentUVVal.classList.remove("moderate");
            currentUVVal.classList.remove("low");
          } else if (currentUVVal.textContent <= 10) {
            currentUVVal.classList.add("very-high");
            currentUVVal.classList.remove("high");
            currentUVVal.classList.remove("moderate");
            currentUVVal.classList.remove("low");
          } else {
            currentUVVal.classList.add("extreme");
            currentUVVal.classList.remove("very-high");
            currentUVVal.classList.remove("high");
            currentUVVal.classList.remove("moderate");
            currentUVVal.classList.remove("low");
          }
          currentDisplayEl.appendChild(currentUVEl);

          // currentUVEl.textContent = `UV Index: ${currentUV}`;
          // currentDisplayEl.appendChild(currentUVEl);

          // 5 day forecast: current + 5
          for (i = 0; i < 5; i++) {
            var forecastList = data.daily;
            console.log(forecastList);
            var forecastContainerEl = document.createElement("p");
            forecastContainerEl.setAttribute("class", "col-2");

            // Turned timestamp from API to calender time
            var ts = new Date(forecastList[i].dt * 1000);
            var forecastDate = ts.toLocaleDateString();
            console.log(forecastDate);
            var forecastDateEl = document.createElement("h5");
            forecastDateEl.textContent = forecastDate;
            forecastContainerEl.appendChild(forecastDateEl);
            // Icon
            var forecastIcon = forecastList[i].weather[0].icon;
            console.log(forecastIcon);
            var forecastIconURL = `http://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
            var forecastIconEl = document.createElement("img");
            forecastIconEl.src = forecastIconURL;
            forecastContainerEl.appendChild(forecastIconEl);
            // forecast Temp
            var forecastTemp = forecastList[i].temp.day;
            var forecastTempEl = document.createElement("p");
            forecastTempEl.textContent = `Temp: ${forecastTemp} ℉`;
            forecastContainerEl.appendChild(forecastTempEl);
            // forecast Wind
            var forecastWind = forecastList[i].wind_speed;
            console.log(forecastWind);
            var forecastWindEl = document.createElement("p");
            forecastWindEl.textContent = `Wind: ${forecastWind} MPH`;
            forecastContainerEl.appendChild(forecastWindEl);
            // forecast Humidity
            var forecastHumidity = forecastList[i].humidity;
            console.log(forecastHumidity);
            var forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.textContent = `Humidity: ${forecastHumidity} %`;
            forecastContainerEl.appendChild(forecastHumidityEl);
            forecastEl.appendChild(forecastContainerEl);
          }
        });
    });
}

searchHistoryContainerEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.matches("#search-list")) {
    searchInputEl.value = event.target.textContent;
    var search = event.target.textContent;

    getWeatherData(search);
  }
});

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
