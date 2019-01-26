var locbutton = document.getElementById("location-btn");
var forecastSum = document.getElementById("forecast-sum");
var currentTemp = document.getElementById("current-temp");

function getForecastByCity() {
  var location = document.getElementById("location-field").value;
  var request = new XMLHttpRequest();
  request.open('GET', `https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=${location}`)
  request.onload = function() {
    var forecastData = JSON.parse(request.responseText).data.attributes;
    console.log(forecastData);
    createWeather(forecastData);
  };
  request.send();
}

locbutton.addEventListener("click",getForecastByCity);

function createWeather(responseData){
  let today=  responseData.daily_weather[0];
  var location = document.getElementById("location-field").value;
  var date = new Date();
  $("#forecast-sum").append(
    `<div>
        <h8 id="test-id">${responseData.current_weather.summary}</h8></br>
        <h8>${responseData.current_weather.temperature}&deg</h8>
        <p>High:${today.temp_high}&deg Low:${today.temp_low}&deg</p>
      </div>
      <div>
      <h3>${location}</h3>
      </div>
      <div>
        <a font-weight="normal"href="url">Change Location</a>
        <a font-weight="normal"href="url">Favorite</a>
      </div>`)
    }
