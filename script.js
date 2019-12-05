$("#locInfo").css("display", "none");
var longitude;
var latitude;
function removeSpecialChars(str) {
  return str.replace(/(?!\w|\s)./g, '')
    .replace(/\s+/g, ' ')
    .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
    .replace(/(\d{1})(\d{3})(\d{3})(\d+)/, '$1-$2-$3-$4');
}
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
 
  var searchCity = $("#search-bar").val()
  var sicCode = $('#dropDown').val()
  var sicName = $('#dropDown option:selected').text();
  console.log("sicName " +sicName)

    var queryURL = "https://www.mapquestapi.com/search/v2/radius?origin="+searchCity+"&radius=30&maxMatches=5&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|"+sicCode+"&outFormat=json&key=6RHaXG5h6NsBxqDGSe1ay54qfbq31qnl"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
        longitude = response.origin.displayLatLng.lng;
        latitude = response.origin.displayLatLng.lat;
       mapLocation(latitude, longitude);


  var cityName = response.origin.adminArea5;
  var stateName = response.origin.adminArea3;
  var lat = response.origin.displayLatLng.lat;
  var lng = response.origin.displayLatLng.lng;
  var googleUrl ='http://www.google.com/search?q=';
  function search()
        {
          query = searchCity;
          url ='http://www.google.com/search?q=' + query;
          window.open(url,'_blank');
        }
         

  
       
console.log(response)

      var marker1 = L.marker([response.searchResults[0].shapePoints["0"], response.searchResults[0].shapePoints["1"]]).addTo(map);
      marker1.bindPopup(response.searchResults[0].name).openPopup();


       var marker2 = L.marker([response.searchResults[1].shapePoints["0"], response.searchResults[1].shapePoints["1"]]).addTo(map);
       marker2.bindPopup(response.searchResults[1].name).openPopup();


       var marker3 = L.marker([response.searchResults[2].shapePoints["0"], response.searchResults[2].shapePoints["1"]]).addTo(map);
       marker3.bindPopup(response.searchResults[2].name).openPopup();

       var marker4 = L.marker([response.searchResults[3].shapePoints["0"], response.searchResults[3].shapePoints["1"]]).addTo(map);
       marker4.bindPopup(response.searchResults[3].name).openPopup();

       var marker5 = L.marker([response.searchResults[4].shapePoints["0"], response.searchResults[4].shapePoints["1"]]).addTo(map);
       marker5.bindPopup(response.searchResults[4].name).openPopup();

       
      // Cities + links
      var resultOne = "<b>" + "<a href = 'http://www.google.com/search?q=" + response.searchResults[0].name + "'target=_blank>" + response.searchResults[0].name + "</a>" + "</b><br>" + response.searchResults[0].fields.address + "<br>" + removeSpecialChars(response.searchResults[0].fields.phone) + "<br>";
 
      var resultTwo = "<b>" + "<a href = 'http://www.google.com/search?q=" + response.searchResults[1].name + "'target=_blank>" + response.searchResults[1].name + "</a>" + "</b><br>" + response.searchResults[1].fields.address + "<br>" + removeSpecialChars(response.searchResults[1].fields.phone) + "<br>";

      var resultThree = "<b>" + "<a href = 'http://www.google.com/search?q=" + response.searchResults[2].name + "'target=_blank>" + response.searchResults[2].name + "</a>" + "</b><br>" + response.searchResults[2].fields.address + "<br>" + removeSpecialChars(response.searchResults[2].fields.phone) + "<br>";

      var resultFour = "<b>" + "<a href = 'http://www.google.com/search?q=" + response.searchResults[3].name + "'target=_blank>" + response.searchResults[3].name + "</a>" + "</b><br>" + response.searchResults[3].fields.address + "<br>" + removeSpecialChars(response.searchResults[3].fields.phone) + "<br>";

      var resultFive = "<b>" + "<a href = 'http://www.google.com/search?q=" + response.searchResults[4].name + "'target=_blank>" + response.searchResults[4].name + "</a>" + "</b><br>" + response.searchResults[4].fields.address + "<br>" + removeSpecialChars(response.searchResults[4].fields.phone) + "<br>";

        var cityLink = 'http://www.google.com/search?q=' + searchCity;

      // City Link
      $("#locInfo").append("<article class='message is-medium' id='cityHeader'><h1>" + "<a target=_blank href =" + cityLink + ">"  + searchCity  + ", " + stateName + "</a></h1>" + "<p id='sicname'>"+ sicName +"<br>"+" Near By"+"</p></article>"); 
          
      // POI cards
      $("#locInfo").append("<article class='message is-medium' id='locBox'><p>"+resultOne+"</style></p></article>");

      $("#locInfo").append("<article class='message is-medium'><p>"+resultTwo+"</p></article>");

      $("#locInfo").append("<article class='message is-medium'><p>"+resultThree+"</p></article>");

      $("#locInfo").append("<article class='message is-medium'><p>"+resultFour+"</p></article>");

      $("#locInfo").append("<article class='message is-medium'><p>"+resultFive+"</p></article>");
      $("#locInfo").css("display", "block");
      

    });

    $("#locInfo").empty();


 });





  
   