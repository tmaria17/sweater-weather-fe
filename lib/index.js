// This file is in the entry point in your webpack config.
// var $location = document.getElementById("location-field").value;

$('#location-button').click(function()
  {
  $.ajax({
    url:"https://safe-reaches-47529.herokuapp.com/api/v1/forecast?location=" + $('#location-field'),
    typ: "GET",
    async: false,
    dataType: 'jsonp',
    success: function(result){ console.log(result); }
  })
})
