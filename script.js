var weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={54025b88abec8d86cdfc8b7b376ecf31}";

// var searchHistory = [];
// var searchHistoryContainer = document.querySelector("#history");

//API
fetch(weatherURL)
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
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
