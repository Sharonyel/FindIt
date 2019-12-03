var longitude;
var latitude;
// $('mapCity').append("<div class='dispMap width=600px height=300px' id='mapid'></div>")

var map = L.map('mapid')


function mapLocation(latitude, longitude) {
         map.setView([latitude, longitude], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam90Z3oiLCJhIjoiY2szYnNyMW94MHJ2bTNwbWh5OXRieTRuZiJ9.VSEzFv1tyPcznHLwTt1CHA'
}).addTo(map);
var marker = L.marker([latitude, longitude]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am in Uptown CLT").openPopup();


}
$("#search-button").click( function(){
 
  
  var searchCity = $("#search-bar").val();
  console.log(searchCity)
    var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin="+searchCity+"&radius=1&maxMatches=3&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        
        longitude = response.origin.displayLatLng.lng;
        latitude = response.origin.displayLatLng.lat;
       mapLocation(latitude, longitude);
      //  clearMap();
        });
});

// getting POI information
var groupSicCode;
var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin=Charlotte&radius=10&maxMatches=8&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|999333&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
    console.log('here')
    console.log(response.searchResults[0].name)
    console.log(response.searchResults[0].fields.address)
    console.log(response.searchResults[0].fields.city)
    // console.log(response.searchResults[3].fields.)

    });


  
   