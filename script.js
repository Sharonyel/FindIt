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
// marker.bindPopup("<b>Hello world!</b><br>I am in Uptown CLT").openPopup();


}
$("#search-button").click( function(){
 
  
  var searchCity = $("#search-bar").val();
  console.log(searchCity)
    var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin="+searchCity+"&radius=30&maxMatches=5&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|565101&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        
        longitude = response.origin.displayLatLng.lng;
        latitude = response.origin.displayLatLng.lat;
       mapLocation(latitude, longitude);

       L.marker([response.searchResults[0].shapePoints["0"], response.searchResults[0].shapePoints["1"]]).addTo(map);

       L.marker([response.searchResults[1].shapePoints["0"], response.searchResults[1].shapePoints["1"]]).addTo(map);

    //    L.mapquest.textMarker([response.searchResults[1].shapePoints["0"], response.searchResults[1].shapePoints["1"]]).addTo(map);

        });
});

// getting POI information
var searchCity = $("#search-bar").val();
var groupSicCode;
var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin= "+searchCity+"&radius=10&maxMatches=8&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|999333&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    // console.log('here')
    console.log(response.searchResults[0].name)
    console.log(response.searchResults[0].fields.address)
    console.log(response.searchResults[0].fields.city)
    // console.log(response.searchResults[3].fields.)

    console.log("here");

//    L.marker([35.221807,-80.838857]).addTo(map);
    // L.marker([response.searchResults[i].shapePoints[0], response.searchResults[i].shapePoints[1]]).addTo(map);
    });


  
   