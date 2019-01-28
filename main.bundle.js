/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";

	var locbutton = document.getElementById("location-btn");
	var forecastSum = document.getElementById("forecast-sum");
	var currentTemp = document.getElementById("current-temp");

	$(document).ready(function () {
	  $("#location-btn").on('click', function () {
	    var location = document.getElementById("location-field").value;
	    $.ajax({
	      type: 'GET',
	      url: "https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=" + location,
	      success: function success(result) {
	        var weatherData = result.data.attributes;
	        createWeatherOverview(weatherData);
	        createWeatherDetails(weatherData);
	        createHourlySummary(weatherData);
	        createWeeklyOverview(weatherData);
	        addFavorite();
	        delFavorite();
	      }
	    });
	  });
	});

	function addFavorite() {
	  $("#favorite-button").on('click', function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    console.log("click");
	    var location = document.getElementById("location-field").value;
	    $.ajax({
	      type: "POST",
	      url: "https://safe-reaches-47529.herokuapp.com/api/v1/favorites",
	      data: { api_key: "ALIwoEoZo_Rr92Fj5GlCYg", location: location },
	      success: function success(result) {
	        alert(location + " has been added to your favorites!");
	      }
	    });
	  });
	}

	function delFavorite() {
	  $("#delete-button").on('click', function (event) {
	    event.preventDefault();
	    event.stopPropagation();
	    console.log("click");
	    var location = document.getElementById("location-field").value;
	    $.ajax({
	      type: "DELETE",
	      url: "https://safe-reaches-47529.herokuapp.com/api/v1/favorites",
	      data: { api_key: "ALIwoEoZo_Rr92Fj5GlCYg", location: location },
	      success: function success(result) {
	        alert(location + " has been deleted from your favorites!");
	      }
	    });
	  });
	}

	function createWeatherOverview(responseData) {
	  console.log(responseData);

	  var today = responseData.daily_weather[0];
	  var location = document.getElementById("location-field").value;
	  var date = new Date();
	  $("#forecast-sum").append("<div>\n        <h8 >" + responseData.current_weather.summary + "</h8></br>\n        <h8 id = \"temp\">" + responseData.current_weather.temperature + "&deg</h8>\n        <p>High:" + today.temp_high + "&deg Low:" + today.temp_low + "&deg</p>\n      </div>\n      <div>\n      <h3>" + location + "</h3>\n      </div>\n      <div>\n        <p><a font-weight=\"normal\" class=\"links\" id=\"favorite-button\" href=\"\">Favorite</a></p>\n        <p><a font-weight=\"normal\" class=\"links\" id=\"delete-button\" href=\"\"> Delete Favorite</a></p>\n        <p><a font-weight=\"normal\" class=\"links\" id=\"change-button\" href=\"\" onclick=\"clearForm()\"> Change Location</a></p>\n      </div>");
	}

	function createWeatherDetails(detailData) {
	  var currentForecast = detailData.current_weather;
	  var today = detailData.daily_weather[0];
	  var tonight = detailData.hourly_weather[6];
	  $("#forecast-details").append("<div>\n        <p>Details</p>\n        <div><i class=\"wi wi-snow\"></i></div>\n        <p id=\"test-id\">" + currentForecast.summary + "</p>\n        <p class=\"smaller-text\">Today: " + today.summary + "</p>\n        <p class=\"smaller-text\">Tonight: " + tonight.summary + "</p>\n         </div>\n         <div>\n         <p>Feels Like: " + currentForecast.feels_like + "&deg</p>\n         <p>Humidity: " + currentForecast.humidity + "%</p>\n         <p>Visibility: " + currentForecast.visibility + " miles</p>\n         <p>Uv Index: " + currentForecast.uv_index + "</p>\n         </div>");
	}

	function createHourlySummary(hourlyData) {
	  var hourOne = hourlyData.hourly_weather[0];
	  var hourTwo = hourlyData.hourly_weather[1];
	  var hourThree = hourlyData.hourly_weather[2];
	  var hourFour = hourlyData.hourly_weather[3];
	  var hourFive = hourlyData.hourly_weather[4];
	  var hourSix = hourlyData.hourly_weather[5];

	  $("#summary-hours").append("\n        <div> <p>" + hourOne.time + "</p><p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p> <p>" + hourOne.temperature + "&deg</p></div>\n        <div><p>" + hourTwo.time + "</p> <p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p><p>" + hourTwo.temperature + "&deg</p> </div>\n        <div><p>" + hourThree.time + "</p><p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p> <p>" + hourThree.temperature + "&deg</p>  </div>\n        <div><p>" + hourFour.time + "</p> <p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p><p>" + hourFour.temperature + "&deg</p>  </div>\n        <div><p>" + hourFive.time + "</p><p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p> <p>" + hourFive.temperature + "&deg</p> </div>\n        <div><p>" + hourSix.time + "</p><p> <i id=\"hour-icon\" class=\"wi wi-moon-new\"></i></p> <p>" + hourSix.temperature + "&deg</p>  </div>\n        ");
	};

	function createWeeklyOverview(dailyData) {
	  var dayOne = dailyData.daily_weather[0];
	  var dayTwo = dailyData.daily_weather[1];
	  var dayThree = dailyData.daily_weather[2];
	  var dayFour = dailyData.daily_weather[3];
	  var dayFive = dailyData.daily_weather[4];

	  $("#weekly-summary").append("\n        <div>\n          <div class=\"hidden\">\"\"</div>\n          <div>Monday: </div>\n          <div class=\"hidden\">\"\" </div>\n\n          <div>Tuesday: </div>\n          <div class=\"hidden\">\"\" </div>\n\n          <div id=\"long-day\">Wednesday: </div>\n          <div class=\"hidden\">\"\" </div>\n\n          <div>Thursday: </div>\n          <div class=\"hidden\">\"\"</div>\n\n          <div>Friday: </div>\n        </div>\n\n        <div class = \"s-box\">\n          <div>\n            <div><i class=\"wi wi-snow\"></i></div>\n            " + dayOne.icon + "\n          </div>\n          <div>\n          <div><i class=\"wi wi-day-cloudy\"></i></div>\n            " + dayTwo.icon + "\n          </div>\n          <div>\n          <div><i class=\"wi wi-night-alt-cloudy\"></i></div>\n            " + dayThree.icon + "\n          </div>\n          <div>\n            <div><i class=\"wi wi-night-alt-cloudy\"></i></div>\n            " + dayFour.icon + "\n          </div>\n          <div>\n            <div><i class=\"wi wi-day-sunny\"></i></div>\n            " + dayFive.icon + "\n          </div>\n        </div>\n\n        <div >\n          <div class= \"s-box\">\n          <div><i class=\"wi wi-raindrop\"></i></div>\n          " + Math.floor(dayOne.chance_of_rain * 100) + "%\n           </div>\n          <div class=\"s-box\">\n            <div><i class=\"wi wi-raindrop\"></i></div>\n          " + Math.floor(dayTwo.chance_of_rain * 100) + "%\n          </div>\n          <div class = \"s-box\">\n            <div><i class=\"wi wi-raindrop\"></i></div>\n          " + Math.floor(dayThree.chance_of_rain * 100) + "%\n           </div>\n          <div class =\"s-box\">\n            <div><i class=\"wi wi-raindrop\"></i></div>\n          " + Math.floor(dayFour.chance_of_rain * 100) + "%\n          </div>\n          <div clas = \"s-box\">\n            <div><i class=\"wi wi-raindrop\"></i></div>\n          " + Math.floor(dayFive.chance_of_rain * 100) + "%\n           </div>\n        </div>\n\n        <div class= \"s-box\">\n          <div> <i class=\"wi wi-direction-up\"></i></div>\n          <div>" + dayOne.temp_high + "&deg </div>\n          <div><i class=\"wi wi-direction-up\"></i></div>\n          <div>" + dayTwo.temp_high + "&deg </div>\n          <div><i class=\"wi wi-direction-up\"></i></div>\n          <div>" + dayThree.temp_high + "&deg</div>\n          <div><i class=\"wi wi-direction-up\"></i></div>\n          <div>" + dayFour.temp_high + "&deg </div>\n          <div><i class=\"wi wi-direction-up\"></i></div>\n          <div>" + dayFive.temp_high + "&deg </div>\n        </div>\n\n        <div class= \"s-box\">\n          <div><i class=\"wi wi-direction-down\"></i></div>\n          <div>" + dayOne.temp_low + "&deg</div>\n          <div><i class=\"wi wi-direction-down\"></i></div>\n          <div>" + dayTwo.temp_low + "&deg</div>\n          <div><i class=\"wi wi-direction-down\"></i></div>\n          <div>" + dayThree.temp_low + "&deg</div>\n          <div><i class=\"wi wi-direction-down\"></i></div>\n          <div>" + dayFour.temp_low + "&deg</div>\n          <div><i class=\"wi wi-direction-down\"></i></div>\n          <div>" + dayFive.temp_low + "&deg</div>\n          </div>\n        ");
	}

	function clearForm() {
	  var location = document.getElementById("location-field").value;
	  location.value = "";
	}

/***/ })
/******/ ]);