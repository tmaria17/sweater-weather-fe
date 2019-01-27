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
	    createWeatherOverview(forecastData);
	    createWeatherDetails(forecastData);
	  };
	  request.send();
	}

	function createWeatherOverview(responseData) {
	  var today = responseData.daily_weather[0];
	  var location = document.getElementById("location-field").value;
	  var date = new Date();
	  $("#forecast-sum").append("<div>\n        <h8 id=\"test-id\">" + responseData.current_weather.summary + "</h8></br>\n        <h8>" + responseData.current_weather.temperature + "&deg</h8>\n        <p>High:" + today.temp_high + "&deg Low:" + today.temp_low + "&deg</p>\n      </div>\n      <div>\n      <h3>" + location + "</h3>\n      </div>\n      <div>\n        <a font-weight=\"normal\"href=\"url\">Change Location</a>\n        <a font-weight=\"normal\"href=\"url\">Favorite</a>\n      </div>");
	}

	function createWeatherDetails(detailData) {
	  var currentForecast = detailData.current_weather;
	  var today = detailData.daily_weather[0];
	  var tonight = detailData.hourly_weather[6];
	  $("#forecast-details").append("<div>\n        <h2>Details</h2>\n        <h6 id=\"test-id\">" + currentForecast.summary + "</h6></br>\n        <h8>Today: " + today.summary + "</h8>\n        <h8>Tonight: " + tonight.summary + "</h8>\n         </div>\n         <div>\n         <p>Feels Like:" + currentForecast.feels_like + "&deg</p>\n         <p>Humidity:" + currentForecast.humidity + "%</p>\n         <p>Visibility:" + currentForecast.visibility + " miles</p>\n         <p>Uv Index:" + currentForecast.uv_index + "</p>\n         </div>");
	}

/***/ })
/******/ ]);