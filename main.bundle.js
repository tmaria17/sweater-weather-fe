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
	locbutton.addEventListener("click", getForecastByCity);

	function getForecastByCity() {
	  var location = document.getElementById("location-field").value;
	  var request = new XMLHttpRequest();
	  request.open('GET', "https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=" + location);
	  request.onload = function () {
	    var forecastData = JSON.parse(request.responseText).data.attributes;
	    console.log(forecastData);
	    createWeatherOverview(forecastData);
	    createWeatherDetails(forecastData);
	    createHourlySummary(forecastData);
	    createWeeklyOverview(forecastData);
	  };
	  request.send();
	}

	function createWeatherOverview(responseData) {
	  var today = responseData.daily_weather[0];
	  var location = document.getElementById("location-field").value;
	  var date = new Date();
	  $("#forecast-sum").append("<div>\n        <h8 id=\"test-id\">" + responseData.current_weather.summary + "</h8></br>\n        <h8>" + responseData.current_weather.temperature + "&deg</h8>\n        <p>High:" + today.temp_high + "&deg Low:" + today.temp_low + "&deg</p>\n      </div>\n      <div>\n      <h3>" + location + "</h3>\n      </div>\n      <div>\n        <p><a font-weight=\"normal\"href=\"url\">Change Location</a></p>\n        <p><a font-weight=\"normal\"href=\"url\">Favorite</a></p>\n      </div>");
	}

	function createWeatherDetails(detailData) {
	  var currentForecast = detailData.current_weather;
	  var today = detailData.daily_weather[0];
	  var tonight = detailData.hourly_weather[6];
	  $("#forecast-details").append("<div>\n        <h2>Details</h2>\n        <h3 id=\"test-id\">" + currentForecast.summary + "</h3></br>\n        <p>Today: " + today.summary + "</p>\n        <p>Tonight: " + tonight.summary + "</p>\n         </div>\n         <div>\n         <p>Feels Like: " + currentForecast.feels_like + "&deg</p>\n         <p>Humidity: " + currentForecast.humidity + "%</p>\n         <p>Visibility: " + currentForecast.visibility + " miles</p>\n         <p>Uv Index: " + currentForecast.uv_index + "</p>\n         </div>");
	}

	function createHourlySummary(hourlyData) {
	  var hourOne = hourlyData.hourly_weather[0];
	  var hourTwo = hourlyData.hourly_weather[1];
	  var hourThree = hourlyData.hourly_weather[2];
	  var hourFour = hourlyData.hourly_weather[3];
	  var hourFive = hourlyData.hourly_weather[4];
	  var hourSix = hourlyData.hourly_weather[5];

	  $("#summary-hours").append("\n        <div> <p>" + hourOne.time + "</p> <p>" + hourOne.temperature + "&deg</p></div>\n        <div><p>" + hourTwo.time + "</p> <p>" + hourTwo.temperature + "&deg</p> </div>\n        <div><p>" + hourThree.time + "</p> <p>" + hourThree.temperature + "&deg</p>  </div>\n        <div><p>" + hourFour.time + "</p> <p>" + hourFour.temperature + "&deg</p>  </div>\n        <div><p>" + hourFive.time + "</p> <p>" + hourFive.temperature + "&deg</p> </div>\n        <div><p>" + hourSix.time + "</p> <p>" + hourSix.temperature + "&deg</p>  </div>\n        ");
	};

	function createWeeklyOverview(dailyData) {
	  var dayOne = dailyData.daily_weather[0];
	  var dayTwo = dailyData.daily_weather[1];
	  var dayThree = dailyData.daily_weather[2];
	  var dayFour = dailyData.daily_weather[3];
	  var dayFive = dailyData.daily_weather[4];

	  $("#weekly-summary").append("\n        <div>\n          <p>Monday: </p>\n          <p>Tuesday: </p>\n          <p>Wednesday: </p>\n          <p>Thursday: </p>\n          <p>Friday: </p>\n          </div>\n        <div>\n          <p>" + dayOne.icon + " </p>\n          <p>" + dayTwo.icon + " </p>\n          <p>" + dayThree.icon + " </p>\n          <p>" + dayFour.icon + " </p>\n          <p>" + dayFive.icon + " </p>\n        </div>\n        <div>\n          <p>" + dayOne.chance_of_rain + " </p>\n          <p>" + dayTwo.chance_of_rain + " </p>\n          <p>" + dayThree.chance_of_rain + " </p>\n          <p>" + dayFour.chance_of_rain + " </p>\n          <p>" + dayFive.chance_of_rain + " </p>\n          </div>\n        <div>\n          <p>" + dayOne.temp_high + "&deg </p>\n          <p " + dayTwo.temp_high + "&deg </p>\n          <p>" + dayThree.temp_high + "&deg </p>\n          <p>" + dayFour.temp_high + "&deg </p>\n          <p>" + dayFive.temp_high + "&deg </p>\n           </div>\n        <div>\n          <p>" + dayOne.temp_low + "&deg</p>\n          <p>" + dayTwo.temp_low + "&deg</p>\n          <p>" + dayThree.temp_low + "&deg</p>\n          <p>" + dayFour.temp_low + "&deg</p>\n          <p>" + dayFive.temp_low + "&deg</p>\n          </div>\n        ");
	}

/***/ })
/******/ ]);