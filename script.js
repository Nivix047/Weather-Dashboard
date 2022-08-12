var weatherURL = "";

// "https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31";

// Set a variable for search and all temperal literals
// var weatherGeoURL = `api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
var search = "los angeles";
var weatherGeoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=54025b88abec8d86cdfc8b7b376ecf31`;

// var searchHistory = [];
// var searchHistoryContainer = document.querySelector("#history");

//API for weather
//

//API for Geo
fetch(weatherGeoURL)
  .then(function (response) {
    // console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=minutely,hourly&appid=54025b88abec8d86cdfc8b7b376ecf31`
    )
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
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
