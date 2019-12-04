var longitude;
var latitude;

var map = L.map('mapid')

navigator.geolocation.getCurrentPosition(function(position) {
    mapLocation(position.coords.latitude, position.coords.longitude);
  });


function mapLocation(latitude, longitude) {
         map.setView([latitude, longitude], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam90Z3oiLCJhIjoiY2szYnNyMW94MHJ2bTNwbWh5OXRieTRuZiJ9.VSEzFv1tyPcznHLwTt1CHA'
}).addTo(map);
var marker = L.marker([latitude, longitude]).addTo(map);
marker.bindPopup("<b>You Are Here</b>").openPopup();


}
$("#search-button").click( function(){
 
  var searchCity = $("#search-bar").val();
  var sicCode = $('#dropDown').val()
  // var catName = $('#dropDown').textContent;
  // console.log(catName)

    var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin="+searchCity+"&radius=30&maxMatches=5&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|"+sicCode+"&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        longitude = response.origin.displayLatLng.lng;
        latitude = response.origin.displayLatLng.lat;
       mapLocation(latitude, longitude);


  var cityName = response.origin.adminArea5;
  var lat = response.origin.displayLatLng.lat;
  var lng = response.origin.displayLatLng.lng;

console.log(response)

      var marker1 =  L.marker([response.searchResults[0].shapePoints["0"], response.searchResults[0].shapePoints["1"]]).addTo(map);
      marker1.bindPopup(response.searchResults[0].name).openPopup();


       var marker2 = L.marker([response.searchResults[1].shapePoints["0"], response.searchResults[1].shapePoints["1"]]).addTo(map);
       marker2.bindPopup(response.searchResults[1].name).openPopup();


       var marker3 = L.marker([response.searchResults[2].shapePoints["0"], response.searchResults[2].shapePoints["1"]]).addTo(map);
       marker3.bindPopup(response.searchResults[2].name).openPopup();

       var marker4 = L.marker([response.searchResults[3].shapePoints["0"], response.searchResults[3].shapePoints["1"]]).addTo(map);
       marker4.bindPopup(response.searchResults[3].name).openPopup();

       var marker5 = L.marker([response.searchResults[4].shapePoints["0"], response.searchResults[4].shapePoints["1"]]).addTo(map);
       marker5.bindPopup(response.searchResults[4].name).openPopup();

       var resultOne = "<b>" + response.searchResults[0].name + "</b><br>" + response.searchResults[0].fields.address + "<br>" + response.searchResults[0].fields.phone + "<br>";
 
       var resultTwo = "<b>" + response.searchResults[1].name + "</b><br>" + response.searchResults[1].fields.address + "<br>" + response.searchResults[1].fields.phone + "<br>";

       var resultThree = "<b>" + response.searchResults[2].name + "</b><br>"  + response.searchResults[2].fields.address + "<br>" + response.searchResults[2].fields.phone + "<br>";

       var resultFour = "<b>" + response.searchResults[3].name + "</b><br>" + response.searchResults[3].fields.address + "<br>" + response.searchResults[3].fields.phone + "<br>";

        var resultFive = "<b>" + response.searchResults[4].name + "</b><br>"  + response.searchResults[4].fields.address + "<br>" +response.searchResults[4].fields.phone + "<br>";
     
  
       $("#locInfo").append("<article class='message is-medium'></p><p>"+resultOne+"</p></article>");
       $("#locInfo").append("<article class='message is-medium'></p><p>"+resultTwo+"</p></article>");
       $("#locInfo").append("<article class='message is-medium'></p><p>"+resultThree+"</p></article>");
       $("#locInfo").append("<article class='message is-medium'></p><p>"+resultFour+"</p></article>");
       $("#locInfo").append("<article class='message is-medium'></p><p>"+resultFive+"</p></article>");

        });
});





  
   