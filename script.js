// API use here, so at least one use of the fetch API script, possibly multiple.
// May have to use multiple pages.
var citiesList = document.getElementById("list-tab")
var cityWeather = document.getElementById("nav-tabContent")

var APIKey = "af02ea1d45601642cf73d29651dfd0dd"
// var lat = null
// var lon = null --- Alternative means, probably less useful to the user, and out of scope of the MVP
var city = "West+Jordan"
var grabCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" +  APIKey;
var grabForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid" + APIKey

console.log(grabUrl)

fetch(
  grabUrl
)
  .then(function(response) {
    if (response.status !== 200) {
      console.log("error")
    }
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })


// function getWeather() {

//   fetch(grabUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function)
    

// }

// Allows the 'list-tab' (placeholder) items to show their associated data when clicked.
$('#list-tab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

// Refer to: 
// https://openweathermap.org/current#name