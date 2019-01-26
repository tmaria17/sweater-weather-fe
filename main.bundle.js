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

	function getForecastByCity() {
	  var location = document.getElementById("location-field").value;
	  var request = new XMLHttpRequest();
	  request.open('GET', "https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=" + location);
	  request.onload = function () {
	    var forecastData = JSON.parse(request.responseText).data.attributes;
	    console.log(forecastData);
	    createWeather(forecastData);
	  };
	  request.send();
	}
	locbutton.addEventListener("click", getForecastByCity);

	function createWeather(responseData) {
	  var today = responseData.daily_weather[0];
	  var location = document.getElementById("location-field").value;
	  var date = new Date();
	  $("#forecast-sum").append("<h8>" + responseData.current_weather.summary + "</h8></br>\n      <h8>" + responseData.current_weather.temperature + "&deg</h8>\n      <p>High:" + today.temp_high + "&deg Low:" + today.temp_low + "&deg</p>\n      <h3>" + location + "<h10><a font-weight=\"normal\"href=\"url\">Change Location</a> <a font-weight=\"normal\"href=\"url\">Favorite</a><h10><h3>\n      <div class=\"inner-div\"></div>");
	}

/***/ })
/******/ ]);