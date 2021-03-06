var locbutton = document.getElementById("location-btn");
var forecastSum = document.getElementById("forecast-sum");
var currentTemp = document.getElementById("current-temp");

$( document ).ready(function() {
  $("#location-btn").on('click', function(){
    var location = document.getElementById("location-field").value;
    $.ajax({
      type: 'GET',
      url: `https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=${location}`,
      success: function(result) {
        var weatherData= result.data.attributes
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

function addFavorite(){
  $("#favorite-button").on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("click");
    var location = document.getElementById("location-field").value;
    $.ajax({
      type: "POST",
      url:`https://safe-reaches-47529.herokuapp.com/api/v1/favorites`,
      data: {api_key: "ALIwoEoZo_Rr92Fj5GlCYg", location: location },
      success: function(result) {
        alert(`${location} has been added to your favorites!`);
      }
    })
  })
}

function delFavorite(){
  $("#delete-button").on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("click");
    var location = document.getElementById("location-field").value;
    $.ajax({
      type: "DELETE",
      url:`https://safe-reaches-47529.herokuapp.com/api/v1/favorites`,
      data: {api_key: "ALIwoEoZo_Rr92Fj5GlCYg", location: location },
      success: function(result) {
        alert(`${location} has been deleted from your favorites!`);
      }
    })
  })
}

function createWeatherOverview(responseData){
  console.log(responseData)

  let today=  responseData.daily_weather[0];
  var location = document.getElementById("location-field").value;
  var date = new Date();
  $("#forecast-sum").append(
    `<div>
        <h8 >${responseData.current_weather.summary}</h8></br>
        <h8 id = "temp">${responseData.current_weather.temperature}&deg</h8>
        <p>High:${today.temp_high}&deg Low:${today.temp_low}&deg</p>
      </div>
      <div>
      <h3>${location}</h3>
      </div>
      <div>
        <p><a font-weight="normal" class="links" id="favorite-button" href="">Favorite</a></p>
        <p><a font-weight="normal" class="links" id="delete-button" href=""> Delete Favorite</a></p>
        <p><a font-weight="normal" class="links" id="change-button" href="" onclick="clearForm()"> Change Location</a></p>
      </div>`);
    }

    function createWeatherDetails(detailData){
      let currentForecast= detailData.current_weather
      let today=detailData.daily_weather[0];
      let tonight=detailData.hourly_weather[6];
      $("#forecast-details").append(
        `<div>
        <p>Details</p>
        <div><i class="wi wi-snow"></i></div>
        <p id="test-id">${currentForecast.summary}</p>
        <p class="smaller-text">Today: ${today.summary}</p>
        <p class="smaller-text">Tonight: ${tonight.summary}</p>
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
      let hourSeven = hourlyData.hourly_weather[6];
      let hourEight = hourlyData.hourly_weather[7];
      let hourNine = hourlyData.hourly_weather[8];
      let hourTen = hourlyData.hourly_weather[9];
      let hourEleven = hourlyData.hourly_weather[10];
      let hourTweleve = hourlyData.hourly_weather[11];

      $("#summary-hours").append(
        `
        <div class="hour-div"> <p>${hourOne.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourOne.temperature}&deg</p></div>
        <div class="hour-div"><p>${hourTwo.time}</p> <p> <i id="hour-icon" class="wi wi-moon-new"></i></p><p>${hourTwo.temperature}&deg</p> </div>
        <div class="hour-div"><p>${hourThree.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourThree.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourFour.time}</p> <p> <i id="hour-icon" class="wi wi-moon-new"></i></p><p>${hourFour.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourFive.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourFive.temperature}&deg</p> </div>
        <div class="hour-div"><p>${hourSix.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourSix.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourSeven.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourSeven.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourEight.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourEight.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourNine.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourNine.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourTen.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourTen.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourEleven.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourEleven.temperature}&deg</p>  </div>
        <div class="hour-div"><p>${hourTweleve.time}</p><p> <i id="hour-icon" class="wi wi-moon-new"></i></p> <p>${hourTweleve.temperature}&deg</p>  </div>
        `
      )
    };

    function createWeeklyOverview(dailyData){
      let dayOne = dailyData.daily_weather[0];
      let dayTwo = dailyData.daily_weather[1];
      let dayThree = dailyData.daily_weather[2];
      let dayFour = dailyData.daily_weather[3];
      let dayFive = dailyData.daily_weather[4];

      $("#weekly-summary").append(
        `
        <div>
          <div class="hidden">""</div>
          <div>Monday: </div>
          <div class="hidden">"" </div>

          <div>Tuesday: </div>
          <div class="hidden">"" </div>

          <div id="long-day">Wednesday: </div>
          <div class="hidden">"" </div>

          <div>Thursday: </div>
          <div class="hidden">""</div>

          <div>Friday: </div>
        </div>

        <div class = "s-box">
          <div>
            <div><i class="wi wi-snow"></i></div>
            ${dayOne.icon}
          </div>
          <div>
          <div><i class="wi wi-day-cloudy"></i></div>
            ${dayTwo.icon}
          </div>
          <div>
          <div><i class="wi wi-night-alt-cloudy"></i></div>
            ${dayThree.icon}
          </div>
          <div>
            <div><i class="wi wi-night-alt-cloudy"></i></div>
            ${dayFour.icon}
          </div>
          <div>
            <div><i class="wi wi-night-alt-cloudy"></i></div>
            ${dayFive.icon}
          </div>
        </div>

        <div >
          <div class= "s-box">
          <div><i class="wi wi-raindrop"></i></div>
          ${Math.floor(dayOne.chance_of_rain * 100)}%
           </div>
          <div class="s-box">
            <div><i class="wi wi-raindrop"></i></div>
          ${Math.floor(dayTwo.chance_of_rain *100 )}%
          </div>
          <div class = "s-box">
            <div><i class="wi wi-raindrop"></i></div>
          ${Math.floor(dayThree.chance_of_rain * 100)}%
           </div>
          <div class ="s-box">
            <div><i class="wi wi-raindrop"></i></div>
          ${Math.floor(dayFour.chance_of_rain * 100)}%
          </div>
          <div clas = "s-box">
            <div><i class="wi wi-raindrop"></i></div>
          ${Math.floor(dayFive.chance_of_rain * 100)}%
           </div>
        </div>

        <div class= "s-box">
          <div> <i class="wi wi-direction-up"></i></div>
          <div>${dayOne.temp_high}&deg </div>
          <div><i class="wi wi-direction-up"></i></div>
          <div>${dayTwo.temp_high}&deg </div>
          <div><i class="wi wi-direction-up"></i></div>
          <div>${dayThree.temp_high}&deg</div>
          <div><i class="wi wi-direction-up"></i></div>
          <div>${dayFour.temp_high}&deg </div>
          <div><i class="wi wi-direction-up"></i></div>
          <div>${dayFive.temp_high}&deg </div>
        </div>

        <div class= "s-box">
          <div><i class="wi wi-direction-down"></i></div>
          <div>${dayOne.temp_low}&deg</div>
          <div><i class="wi wi-direction-down"></i></div>
          <div>${dayTwo.temp_low}&deg</div>
          <div><i class="wi wi-direction-down"></i></div>
          <div>${dayThree.temp_low}&deg</div>
          <div><i class="wi wi-direction-down"></i></div>
          <div>${dayFour.temp_low}&deg</div>
          <div><i class="wi wi-direction-down"></i></div>
          <div>${dayFive.temp_low}&deg</div>
          </div>
        `
      )
    }

function clearForm(){
  let location = document.getElementById("location-field").value;
  location.value = "";
}
