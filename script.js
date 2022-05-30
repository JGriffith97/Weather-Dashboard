// API use here, so at least one use of the fetch API script, possibly multiple.
// May have to use multiple pages.
var citiesList = document.getElementById("list-tab")
var cityWeather = document.getElementById("nav-tabContent")
var citySubmit = document.getElementById("button-addon2")
var userCityInput = document.getElementById("user-city")
var cityName = document.getElementById("cityName")

var APIKey = "6af1e54c068aac1b96a65def32f165a1"

var grabOneCall;

function convertString() {
  userInput = userCityInput.value.trim().split(" ").join("+").toLowerCase();
}


function setAttributes(element, anchorAttributes) {
  Object.keys(anchorAttributes).forEach(attr => {
    element.setAttribute(attr, attributes[attr]);
  });
}

function getCurrentWeather(grabCurrentUrl) {
  var grabCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial" + "&appid=" + APIKey
// https://api.openweathermap.org/data/2.5/weather?q=west+jordan&units=imperial&appid=6af1e54c068aac1b96a65def32f165a1

  fetch(grabCurrentUrl)
  .then(function (response) {
    if (response.status === 404) {
      console.log("City not found!")
    }
    return response.json();
  })
  .then (function (data) {
    console.log(data);

    var temperature = document.getElementById("temp-span")
    var windy = document.getElementById("wind-span")
    var humid = document.getElementById("humidity-span")
    var uvIndex = document.getElementById("uv-index-span")
    // Note that naming the variable the same as the value given by the API causes issues

    var iconCode = data.weather[0].icon
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"

    $('#cityName').after('<img id= "weather-icon" src="">')

    cityName.textContent = data.name + " "
    $("#weather-icon").attr("src", iconUrl)
    temperature.textContent = data.main.temp
    windy.textContent = data.wind.speed + " MPH"
    humid.textContent = data.main.humidity + "%"

    grabOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial" + "&appid=" + APIKey

    fetch(grabOneCall)
    .then(function (response) {
      if (response.status !== 200) {
        console.log("Well this is annoying")
      }
      return response.json();
    })
    .then (function (data) {
      console.log(data)

      uvIndex.textContent = data.current.uvi
      if (uvIndex.textContent <= 2) {
        uvIndex.style.backgroundColor = "lightgreen"
        uvIndex.style.borderRadius = "8px"
      } else if (uvIndex.textContent > 2 && uvIndex.textContent <= 5) {
        uvIndex.style.backgroundColor = "lightsalmon"
        uvIndex.style.borderRadius = "8px"
      } else if (uvIndex.textContent > 5 && uvIndex.textContent <= 7) {
        uvIndex.style.backgroundColor = "darkorange"
        uvIndex.style.borderRadius = "8px"
      } else if (uvIndex.textContent > 7 && uvIndex.textContent <= 10) {
        uvIndex.style.color = "white"
        uvIndex.style.backgroundColor = "darkred"
        uvIndex.style.borderRadius = "8px"
      } else if (uvIndex.textContent >= 11) {
        uvIndex.style.color = "white"
        uvIndex.style.backgroundColor = "rebeccapurple"
        uvIndex.style.borderRadius = "8px"
      }
    })
  });
}

function getFiveDay(grabForecastUrl) {
  var grabForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial" + "&appid=" + APIKey

// https://api.openweathermap.org/data/2.5/forecast?q=west+jordan&units=imperial&appid=6af1e54c068aac1b96a65def32f165a1

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


// function getOneCall(grabOneCall) {


//   fetch(grabOneCall)
//   .then(function (response) {
//     if (response.status === 404) {
//       console.log("City not found!")
//     }
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//   })
// }

// Allows the 'list-tab' (placeholder) items to show their associated data when clicked.
$('#list-tab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

// Click event for the submit button.
$(citySubmit).on('click', function (e) {
  if (userCityInput.value.length == 0) {
    console.log("Nothing here")
    return
  }
  convertString()
  e.preventDefault()
  getCurrentWeather()
  getFiveDay()
  userCityInput.value = ""
  userCityInput.placeholder = "If no information appears, city not found."
  cityName.textContent = ""
})

// Refer to: 
// https://openweathermap.org/current#name


// W3 example for removing spaces and filling them with + operator, useful for URL strings.
// let text = "How are you doing today?";
// const myArray = text.split(" ").join("+");
// How+are+you+doing+today?
// Also --join("+").toLowerCase(); -- and .trim() to remove spaces before and after. Clean user input
// returns how+are+you+doing+today?