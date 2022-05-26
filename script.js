// API use here, so at least one use of the fetch API script, possibly multiple.
// May have to use multiple pages.

var APIKey = "af02ea1d45601642cf73d29651dfd0dd"
var lat = null
var lon = null
var city; // Stores the city as entered by user input.
var grabUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// "https://api.openweathermap.org/data/2.5/onecall?appid=af02ea1d45601642cf73d29651dfd0dd"

function getWeather() {
  // lat, lon coordinates required. As well as the appid. exclude, units, and lang are optional.

  fetch(grabUrl)
    .then(function (response) {
      return response.json();
    })

}


// Refer to: 
// https://openweathermap.org/current#name