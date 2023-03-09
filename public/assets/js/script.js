// API use here, so at least one use of the fetch API script, possibly multiple.

// require('dotenv').config();
// This isn't going to work here, as dotenv and node are not client side utilities.
// Gonna have to find a workaround.
// Realistically, if you wanted to hide the API key, you'd rely on sessions, and otherwise
// make an AJAX call to your backend to get it.
// This will require a great deal of restructuring. A matter for the future.

var citiesList = document.getElementById("list-tab")
// var cityWeather = document.getElementById("nav-tabContent")
var citySubmit = document.getElementById("button-addon2")
var userCityInput = document.getElementById("user-city")
var cityName = document.getElementById("cityName")

var APIKey = '6af1e54c068aac1b96a65def32f165a1'

var savedCities = [];

var grabOneCall;
var userInput;

var divText;
var divString;

var dayPlus1 = moment().add(1, 'days').format("L");
var dayPlus2 = moment().add(2, 'days').format("L");
var dayPlus3 = moment().add(3, 'days').format("L");
var dayPlus4 = moment().add(4, 'days').format("L");
var dayPlus5 = moment().add(5, 'days').format("L");

function convertDivString() {
  divString = divText.trim().split(" ").join("+").toLowerCase()
}

function convertString() {
  userInput = userCityInput.value.trim().split(" ").join("+").toLowerCase()
}


function getCurrentWeatherExisting(grabCurrentUrl) {
  var grabCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + divString + "&units=imperial" + "&appid=" + APIKey

  fetch(grabCurrentUrl)
  .then(function (response) {
    return response.json();
  })
  .then (function (data) {
    console.log(data)
    var temperature = document.getElementById("temp-span")
    var windy = document.getElementById("wind-span")
    var humid = document.getElementById("humidity-span")
    var uvIndex = document.getElementById("uv-index-span")

    var iconCode = data.weather[0].icon
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

    $(".first-line").remove()
    $("#weather-icon").remove()
    $('#cityName').after('<img id= "weather-icon" src="">')

    cityName.textContent = data.name + " " + moment().format("L")
    $("#weather-icon").attr("src", iconUrl)
    temperature.textContent = data.main.temp + "°F"
    windy.textContent = data.wind.speed + " MPH"
    humid.textContent = data.main.humidity + "%"

    grabOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial" + "&appid=" + APIKey

    fetch(grabOneCall)
    .then(function (response) {
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

function getFiveDayExisting(grabForecastUrl) {
  var grabForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + divString + "&units=imperial" + "&appid=" + APIKey

  // Example of how this query will turn out:
  // https://api.openweathermap.org/data/2.5/forecast?q=west+jordan&units=imperial&appid=6af1e54c068aac1b96a65def32f165a1

  fetch(grabForecastUrl)
  .then(function (response) {
    console.log(response.status)
    return response.json();
  })
  .then (function (data) {
    console.log(data);

    for (var i = 0; i < data.list.length; i++) {
      // Just to make a note of an issue that cropped up, forecastIcon needed
      // to be declared before forecastIconUrl to avoid a 404 error on the first
      // of the five day's forecasts icons.
      var forecastIcon = data.list[i].weather[0].icon
      var forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png"
      var forecastTemp = data.list[i].main.temp
      var forecastWind = data.list[i].wind.speed
      var forecastHumidity = data.list[i].main.humidity

      $(".forecast-icon").removeAttr("style")
      $(".forecast-icon").eq(i).attr("src", forecastIconUrl)
      $(".forecast-temp").eq(i).text(forecastTemp + "°F")
      $(".forecast-wind").eq(i).text(forecastWind + " MPH")
      $(".forecast-humidity").eq(i).text(forecastHumidity + "%")
    }
    $(".forecast-icon").after("<br class='first-line'>")
  })
}

function getCurrentWeather(grabCurrentUrl) {
  var grabCurrentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial" + "&appid=" + APIKey
// https://api.openweathermap.org/data/2.5/weather?q=west+jordan&units=imperial&appid=6af1e54c068aac1b96a65def32f165a1


// Probably want to write new functions in the event you're clicking existing cities.
// This way no new lines are created for existing cities.
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
    var iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png"

    $(".first-line").remove()
    $("#weather-icon").remove()
    $('#cityName').after('<img id= "weather-icon" src="">')

    $('#list-tab').append('<div class="searched-city">' + data.name + '</div>')
    savedCities.push(data.name)
    saveCities()

    cityName.textContent = data.name + " " + moment().format("L")
    $("#weather-icon").attr("src", iconUrl)
    temperature.textContent = data.main.temp + "°F"
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

    for (var i = 0; i < data.list.length; i++) {
      // Just to make a note of an issue that cropped up, forecastIcon needed
      // to be declared before forecastIconUrl to avoid a 404 error on the first
      // of the five day's forecasts icons.
      var forecastIcon = data.list[i].weather[0].icon
      var forecastIconUrl = "https://openweathermap.org/img/w/" + forecastIcon + ".png"
      var forecastTemp = data.list[i].main.temp
      var forecastWind = data.list[i].wind.speed
      var forecastHumidity = data.list[i].main.humidity

      $(".forecast-icon").removeAttr("style")
      $(".forecast-icon").eq(i).attr("src", forecastIconUrl)
      $(".forecast-temp").eq(i).text(forecastTemp + "°F")
      $(".forecast-wind").eq(i).text(forecastWind + " MPH")
      $(".forecast-humidity").eq(i).text(forecastHumidity + "%")
    }
    $(".forecast-icon").after("<br class='first-line'>")
  })
}

function setForecastDates() {
  $('#day-one').text(dayPlus1)
  $('#day-two').text(dayPlus2)
  $('#day-three').text(dayPlus3)
  $('#day-four').text(dayPlus4)
  $('#day-five').text(dayPlus5)
}

function saveCities() {
  localStorage.setItem("cities", JSON.stringify(savedCities))
}

function loadCities() {
  var saved = JSON.parse(localStorage.getItem("cities"))

  if (saved !== null) {
    savedCities = saved;
    for (var i=0; i < savedCities.length; i++) {
      var city = savedCities[i];

      $('#list-tab').append('<div class="searched-city">' + city + '</div>')
    }
  }


}

// Three parameters, click, the dynamic element that would be selected, the function.
$(citiesList).on('click', ".searched-city", function() {
  divText = $(this).text()
  console.log(divText)
  convertDivString()
  getCurrentWeatherExisting()
  getFiveDayExisting()
})

// Click event for the submit button.
$(citySubmit).on('click', function (e) {
  if (userCityInput.value.length == 0) {
    userCityInput.placeholder = "Please enter a city name."
    return
  }
  convertString()
  e.preventDefault()
  getCurrentWeather()
  getFiveDay()

  userCityInput.value = ""
  userCityInput.placeholder = "City not found."
  cityName.textContent = ""
})

setForecastDates();
loadCities();

// Refer to: 
// https://openweathermap.org/current#name


// W3 example for removing spaces and filling them with + operator, useful for URL strings.
// let text = "How are you doing today?";
// const myArray = text.split(" ").join("+");
// How+are+you+doing+today?
// Also --join("+").toLowerCase(); -- and .trim() to remove spaces before and after. Clean user input
// returns how+are+you+doing+today?