// API use here, so at least one use of the fetch API script, possibly multiple.
// May have to use multiple pages.
var citiesList = document.getElementById("list-tab")
var cityWeather = document.getElementById("nav-tabContent")
var citySubmit = document.getElementById("button-addon2")
var userCityInput = document.getElementById("user-city")

var APIKey1 = "af02ea1d45601642cf73d29651dfd0dd"
var APIKey2 = "6af1e54c068aac1b96a65def32f165a1"
// var lat = null
// var lon = null --- Alternative means, probably less useful to the user, and out of scope of the MVP

var anchorAttributes = {
  class: 'list-group-item list-group-item-action',
  id: 'list',
}

function convertString() {
  userInput = userCityInput.value.split(" ").join("+").toLowerCase();
}


function setAttributes(element, anchorAttributes) {
  Object.keys(anchorAttributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function getCurrentWeather(grabCurrentUrl) {
  var grabCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial" + "&appid=" + APIKey1

  fetch(grabCurrentUrl)
  .then(function (response) {
    console.log(response.status)
    if (response.status === 404) {
      console.log("City not found!")
    }
    return response.json();
  })
  .then (function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      
    }
  });
}

function getFiveDay(grabForecastUrl) {
  var grabForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial" + "&appid=" + APIKey2

  fetch(grabForecastUrl)
  .then(function (response) {
    console.log(response.status)
    if (response.status !== 200) {
      console.log("bad request")
    }
    return response.json();
  })
  .then (function (data) {
    console.log(data);
  })
}

// Allows the 'list-tab' (placeholder) items to show their associated data when clicked.
$('#list-tab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

// Click event for the submit button.
$(citySubmit).on('click', function (e) {
  if (userCityInput.value.length == 0) {
    console.log("Nothing here")
  }
  convertString()
  console.log(userInput)
  e.preventDefault()
  getCurrentWeather()
  getFiveDay()
  userCityInput.value = ""
  userCityInput.placeholder = "If no information appears, city not found."
})

// Refer to: 
// https://openweathermap.org/current#name


// W3 example for removing spaces and filling them with + operator, useful for URL strings.
// let text = "How are you doing today?";
// const myArray = text.split(" ").join("+");
// How+are+you+doing+today?
// Also --join("+").toLowerCase(); -- and .trim() to remove spaces before and after. Clean user input
// returns how+are+you+doing+today?