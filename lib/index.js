var locbutton = document.getElementById("location-btn");
var forecastSum = document.getElementById("forecast-sum");
var currentTemp = document.getElementById("current-temp");
locbutton.addEventListener("click",getForecastByCity);

function getForecastByCity() {
  var location = document.getElementById("location-field").value;
  var request = new XMLHttpRequest();
  request.open('GET', `https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=${location}`)
  request.onload = function() {
    var forecastData = JSON.parse(request.responseText).data.attributes;
    createWeatherOverview(forecastData);
    createWeatherDetails(forecastData);
    createHourlySummary(forecastData);
  };
  request.send();
}

function createWeatherOverview(responseData){
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
      </div>`);
    }

    function createWeatherDetails(detailData){
      let currentForecast= detailData.current_weather
      let today=detailData.daily_weather[0];
      let tonight=detailData.hourly_weather[6];
      $("#forecast-details").append(
        `<div>
        <h2>Details</h2>
        <h3 id="test-id">${currentForecast.summary}</h3></br>
        <p>Today: ${today.summary}</p>
        <p>Tonight: ${tonight.summary}</p>
         </div>
         <div>
         <p>Feels Like: ${currentForecast.feels_like}&deg</p>
         <p>Humidity: ${currentForecast.humidity}%</p>
         <p>Visibility: ${currentForecast.visibility} miles</p>
         <p>Uv Index: ${currentForecast.uv_index}</p>
         </div>`);
    }

    function createHourlySummary(hourlyData){
      let hourOne = hourlyData.hourly_weather[0];
      let hourTwo = hourlyData.hourly_weather[1];
      let hourThree = hourlyData.hourly_weather[2];
      let hourFour = hourlyData.hourly_weather[3];
      let hourFive = hourlyData.hourly_weather[4];
      let hourSix = hourlyData.hourly_weather[5];

      $("#summary-hours").append(
        `
        <div> <p>${hourOne.time}</p> <p>${hourOne.temperature}&deg</p></div>
        <div><p>${hourTwo.time}</p> <p>${hourTwo.temperature}&deg</p> </div>
        <div><p>${hourThree.time}</p> <p>${hourThree.temperature}&deg</p>  </div>
        <div><p>${hourFour.time}</p> <p>${hourFour.temperature}&deg</p>  </div>
        <div><p>${hourFive.time}</p> <p>${hourFive.temperature}&deg</p> </div>
        <div><p>${hourSix.time}</p> <p>${hourSix.temperature}&deg</p>  </div>
        `
      )
    };
