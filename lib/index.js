var locbutton = document.getElementById("location-btn");

function getWeather() {
  var location = document.getElementById("location-field").value;
  var request = new XMLHttpRequest();
  request.open('GET', `https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=${location}`)
  request.onload = function() {
    var jsonData = JSON.parse(request.responseText)["data"];
    console.log(jsonData);
  };
  request.send();
}
locbutton.addEventListener("click",getWeather);
